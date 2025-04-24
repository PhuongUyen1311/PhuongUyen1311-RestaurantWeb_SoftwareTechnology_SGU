import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  // Lấy tất cả món ăn
  @Get()
  getAll() {
    const result = this.foodService.findAll();
    return result;
  }

  // Lấy món ăn theo ID
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.foodService.findOne(id);
  }

  // Lấy món ăn theo danh mục
  @Get('category/search')
  getByCategory(@Query('category') category: string) {
    return this.foodService.getFoodByCategory(category);
  }

  // Thêm món ăn mới
  @Post()
  create(@Body() createFoodDto: any) {
    return this.foodService.create(createFoodDto);
  }

  // Cập nhật món ăn
  @Put(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: any) {
    return this.foodService.update(id, updateFoodDto);
  }

  // Xóa món ăn
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodService.remove(id);
  }
}
