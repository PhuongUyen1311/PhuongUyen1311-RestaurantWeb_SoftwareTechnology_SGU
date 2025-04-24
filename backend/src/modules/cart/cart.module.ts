import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { FoodModule } from '../food/food.module';

@Module({
  imports: [FoodModule],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
