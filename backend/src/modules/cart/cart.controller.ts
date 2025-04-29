import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  
  @Get()
  getCart() {
    const cart = this.cartService.getCart();
    return cart;
  }

  @Post('add')
  async addToCart(@Body() body: { id: string; quantity: number }) {
    const cart = this.cartService.addToCart(body.id, body.quantity);
    return cart;
  }

  @Post('increase')
  async increaseQuantity(@Body() body: { id: string }) {
    // Tăng số lượng
    return this.cartService.increaseQuantity(body.id);
  }

  @Post('decrease')
  async decreaseQuantity(@Body() body: { id: string }) {
    // Giảm số lượng
    return this.cartService.decreaseQuantity(body.id);
  }

  @Delete()
  clearCart() {
    return this.cartService.clearCart();
  }
  
  @Post('remove')
  removeFromCart(@Body() body: { id: string }) {
    return this.cartService.removeFromCart(body.id);
  }

  @Post('update')
  async updateCartItem(@Body() body: { id: string; quantity: number }) {
    // Cập nhật số lượng sản phẩm trong giỏ hàng
    return this.cartService.updateCartItem(body.id, body.quantity);
  }

}