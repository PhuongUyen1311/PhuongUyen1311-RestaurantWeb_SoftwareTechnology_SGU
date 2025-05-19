import { Injectable } from '@nestjs/common';
import { readItemsJson } from 'src/common/utils/readJson';
import { writeItemsJson } from 'src/common/utils/writeJson';

const foodFilePath = '../src/storage/FoodItems.json';

@Injectable()
export class FoodService {
  getAllFood() {
    const foodItems = readItemsJson(foodFilePath);
    return foodItems.filter(item => item.currentQuantity > 0);
  }

  getFoodById(id: string) {
    const foodItems = this.getAllFood();
    return foodItems.find(item => item.id === id);
  }

  getFoodByCategory(category: string) {
    const foodItems = this.getAllFood();
    return foodItems.filter(item => item.category === category && item.currentQuantity > 0);
  }

  // Thêm món ăn mới
  create(newFood: any) {
    const foodItems = this.getAllFood();
    foodItems.push(newFood);
    this.saveFood(foodItems);
    return newFood;
  }

  findAll() {
    return this.getAllFood();
  }

  findOne(id: string) {
    return this.getFoodById(id);
  }

  update(id: string, updatedFood: any) {
    const foodItems = this.getAllFood();
    const index = foodItems.findIndex(item => item.id === id);
    if (index === -1) return null;

    foodItems[index] = { ...foodItems[index], ...updatedFood };
    this.saveFood(foodItems);
    return foodItems[index];
  }

  remove(id: string) {
    const foodItems = this.getAllFood();
    const index = foodItems.findIndex(item => item.id === id);
    if (index === -1) return null;

    const [deleted] = foodItems.splice(index, 1);
    this.saveFood(foodItems);
    return deleted;
  }

  private saveFood(foodItems: any[]) {
    writeItemsJson(foodFilePath, foodItems);
  }
}
