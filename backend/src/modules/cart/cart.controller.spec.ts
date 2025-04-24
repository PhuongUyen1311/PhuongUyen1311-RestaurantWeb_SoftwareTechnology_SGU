import { Controller, Post, Body } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addToCart(@Body() body: { userId: string, productId: string, quantity: number }) {
    return this.cartService.addToCart(body.userId, body.productId, body.quantity);
  }
}
