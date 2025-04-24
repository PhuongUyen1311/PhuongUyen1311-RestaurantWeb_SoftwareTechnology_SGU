import { Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
  private carts = new Map<string, any[]>(); // Lưu tạm vào memory

  addToCart(userId: string, productId: string, quantity: number) {
    const userCart = this.carts.get(userId) || [];
    userCart.push({ productId, quantity });
    this.carts.set(userId, userCart);
    return { success: true, cart: userCart };
  }
}
