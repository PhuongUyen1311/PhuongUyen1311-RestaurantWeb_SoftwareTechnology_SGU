import { Injectable } from '@nestjs/common';
import { readItemsJson } from 'src/common/utils/readJson';
//import { writeItemsJson } from 'src/common/utils/writeJson'; // Đảm bảo bạn đã có hàm này để ghi vào file JSON

@Injectable()
export class FoodService {
  // Lấy tất cả món ăn
  getAllFood() {
    return readItemsJson('../src/storage/FoodItems.json');
  }

  // Lấy món ăn theo ID
  getFoodById(id: string) {
    const foodItems = this.getAllFood();
    return foodItems.find((item) => item.id === id);
  }

  // Lấy món ăn theo danh mục
  getFoodByCategory(category: string) {
    const foodItems = this.getAllFood();
    return foodItems.filter((item) => item.category === category);
  }

  // Thêm món ăn mới (create)
  create(newFood: any) {
    const foodItems = this.getAllFood();
    foodItems.push(newFood);
    //writeItemsJson('src/storage/FoodItems.json', foodItems);  // Ghi lại danh sách món ăn vào file
    return newFood;
  }

  // Lấy tất cả món ăn (findAll)
  findAll() {
    return this.getAllFood();
  }

  // Lấy món ăn theo ID (findOne)
  findOne(id: string) {
    return this.getFoodById(id);
  }

  // Cập nhật món ăn (update)
  update(id: string, updatedFood: any) {
    let foodItems = this.getAllFood();
    const foodIndex = foodItems.findIndex((item) => item.id === id);
    if (foodIndex === -1) {
      return null; // Không tìm thấy món ăn
    }
    foodItems[foodIndex] = { ...foodItems[foodIndex], ...updatedFood };
    //writeItemsJson('src/storage/FoodItems.json', foodItems);  // Ghi lại danh sách món ăn vào file
    return foodItems[foodIndex];
  }

  // Xóa món ăn (remove)
  remove(id: string) {
    let foodItems = this.getAllFood();
    const foodIndex = foodItems.findIndex((item) => item.id === id);
    if (foodIndex === -1) {
      return null; // Không tìm thấy món ăn
    }
    const deletedFood = foodItems.splice(foodIndex, 1);
    //writeItemsJson('src/storage/FoodItems.json', foodItems);  // Ghi lại danh sách món ăn vào file
    return deletedFood;
  }
}
