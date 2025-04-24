import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  
  @Get()
  getCart() {
    const cart = this.cartService.getCart();
    console.log('Giỏ hàng hiện tại:', cart);
    return cart;
  }

  @Post('add')
  async addToCart(@Body() body: { productId: string; quantity: number }) {
    const cart = this.cartService.addToCart(body.productId, body.quantity);
    return cart
  }

  @Post('increase')
  async increaseQuantity(@Body() body: { productId: string}) {
      // Tăng số lượng
      return this.cartService.increaseQuantity(body.productId);
    }

  @Post('decrease')
  async decreaseQuantity(@Body() body: { productId: string}) {
    // Giảm số lượng
    return this.cartService.decreaseQuantity(body.productId);
  }


  @Delete()
  clearCart() {
    return this.cartService.clearCart();
  }
  
  @Post('remove')
  removeFromCart(@Body() body: { productId: string }) {
    return this.cartService.removeFromCart(body.productId);
  }
}