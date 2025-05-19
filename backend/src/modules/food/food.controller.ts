import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { FoodService } from './food.service';
import { CartService } from '../cart/cart.service';
@Controller('food')
export class FoodController {
  constructor(
    private readonly foodService: FoodService,
    private readonly cartService: CartService
  ) { }

  @Get()
  getAll() {
    const result = this.foodService.findAll();
    return result;
  }
  @Get('id')
  getById(@Param('id') id: string) {
    return this.foodService.findOne(id);
  }

  @Get('category')
  getByCategory(@Query('category') category: string) {
    if (category) {
      return this.foodService.getFoodByCategory(category);
    }
    return this.foodService.getAllFood()
  }

  @Post()
  create(@Body() createFoodDto: any) {
    return this.foodService.create(createFoodDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: any) {
    return this.foodService.update(id, updateFoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodService.remove(id);
  }
  @Post('update')
  async updateFoodData(@Body() updateData: any) {
    const cartItems = this.cartService.getCart();
    const updatedItems: any[] = [];

    for (const cartItem of cartItems) {
      const food = await this.foodService.getFoodById(cartItem.id); 
      if (food) {
        const newQuantity = food.currentQuantity - cartItem.quantity;

        // Cập nhật số lượng mới
        const updated = await this.foodService.update(food.id, {
          currentQuantity: newQuantity,
        });

        if (updated) updatedItems.push(updated);
      }
    }

    return {
      success: true,
      message: 'Đã cập nhật số lượng món ăn dựa theo giỏ hàng',
      updatedItems,
    };
  }

}
