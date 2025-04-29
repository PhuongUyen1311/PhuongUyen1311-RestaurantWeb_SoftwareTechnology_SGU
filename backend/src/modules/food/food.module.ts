import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { CartService } from '../cart/cart.service';

@Module({
  controllers: [FoodController],
  providers: [FoodService, CartService],
  exports: [FoodService],
})
export class FoodModule { }
