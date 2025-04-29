import { Injectable } from '@nestjs/common';
import { readItemsJson } from 'src/common/utils/readJson';
import { writeItemsJson } from 'src/common/utils/writeJson';

const foodFilePath = '../src/storage/FoodItems.json';

@Injectable()
export class FoodService {
  // Lấy toàn bộ danh sách món ăn
  getAllFood() {
    const foodItems = readItemsJson(foodFilePath);
    return foodItems.filter(item => item.currentQuantity > 0);
  }
  

  // Lấy món ăn theo ID
  getFoodById(id: string) {
    const foodItems = this.getAllFood();
    return foodItems.find(item => item.id === id);
  }

  // Lọc món ăn theo danh mục
  getFoodByCategory(category: string) {
    const foodItems = this.getAllFood();
    return foodItems.filter(item => item.category === category && item.currentQuantity >0);
  }

  // Thêm món ăn mới
  create(newFood: any) {
    const foodItems = this.getAllFood();
    foodItems.push(newFood);
    this.saveFood(foodItems);
    return newFood;
  }

  // Trả về toàn bộ món ăn
  findAll() {
    return this.getAllFood();
  }

  // Trả về một món ăn theo ID
  findOne(id: string) {
    return this.getFoodById(id);
  }

  // Cập nhật món ăn theo ID
  update(id: string, updatedFood: any) {
    const foodItems = this.getAllFood();
    const index = foodItems.findIndex(item => item.id === id);
    if (index === -1) return null;

    foodItems[index] = { ...foodItems[index], ...updatedFood };
    this.saveFood(foodItems);
    return foodItems[index];
  }

  // Xóa món ăn theo ID
  remove(id: string) {
    const foodItems = this.getAllFood();
    const index = foodItems.findIndex(item => item.id === id);
    if (index === -1) return null;

    const [deleted] = foodItems.splice(index, 1);
    this.saveFood(foodItems);
    return deleted;
  }

  // Lưu danh sách món ăn xuống file JSON
  private saveFood(foodItems: any[]) {
    writeItemsJson(foodFilePath, foodItems);
  }
}
