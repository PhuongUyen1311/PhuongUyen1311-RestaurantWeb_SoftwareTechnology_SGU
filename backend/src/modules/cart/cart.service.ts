import { Injectable } from '@nestjs/common';
import { FoodService } from '../food/food.service';

// Định nghĩa CartItem ngoài class để dễ dàng tái sử dụng
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
}

@Injectable()
export class CartService {
  constructor(private readonly foodService: FoodService) {}

  private cart: CartItem[] = [];

  // Thêm sản phẩm vào giỏ
  async addToCart(productId: string, quantity: number) {
    // Lấy thông tin sản phẩm từ foodService
    const foodItem = await this.foodService.getFoodById(productId);
    
    // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ
    const existingItemIndex = this.cart.findIndex(item => item.productId === productId);
    if (existingItemIndex !== -1) {
      // Nếu sản phẩm đã có trong giỏ, tăng số lượng
      this.cart[existingItemIndex].quantity += quantity;
    } else {
      // Nếu chưa có, thêm sản phẩm mới vào giỏ
      this.cart.push({
        productId: foodItem.id,
        name: foodItem.name,
        price: foodItem.price,
        category: foodItem.category,
        quantity: quantity,
      });
    }
    return {
      success: true,
      cart: this.cart,
    };
  }

  // Lấy tất cả sản phẩm trong giỏ
  getCart() {
    return this.cart;
  }

  // Xóa giỏ hàng
  clearCart() {
    this.cart = [];
    return { success: true };
  }

  // Lấy thông tin sản phẩm từ foodService, nếu cần thiết
  async getCartItems(productId: string) {
    const foodItem = await this.foodService.getFoodById(productId);
    return foodItem;
  }

  async increaseQuantity(productId: string) {
    const foodItem = await this.foodService.getFoodById(productId);
    const maxAvailable = foodItem.availableQuantity; // Lấy số lượng tối đa từ kho
  
    const existingItem = this.cart.find(item => item.productId === productId);
    if (existingItem) {
      const maxCanAdd = maxAvailable - existingItem.quantity;
      if (maxCanAdd <= 0) {
        return {
          success: false,
          message: 'Số lượng sản phẩm trong giỏ đã đạt mức tối đa có thể mua',
        };
      }
      existingItem.quantity += 1; // Tăng số lượng sản phẩm trong giỏ hàng
      return {
        success: true,
        cart: this.cart,
      };
    } 
    else {
      // Nếu sản phẩm chưa có trong giỏ, thêm mới
      this.cart.push({
        productId: foodItem.id,
        name: foodItem.name,
        price: foodItem.price,
        category: foodItem.category,
        quantity: 1, // Bắt đầu với số lượng 1
      });
      return {
        success: true,
        cart: this.cart,
      };
    }
  }
  // Thêm các phương thức này vào CartService

  // Giảm số lượng sản phẩm trong giỏ
  decreaseQuantity(productId: string) {
    const existingItemIndex = this.cart.findIndex(item => item.productId === productId);
    if (existingItemIndex !== -1) {
    // Nếu số lượng <= 0, xóa sản phẩm khỏi giỏ
    if (this.cart[existingItemIndex].quantity <= 0) {
      return this.removeFromCart(productId);
    }
    this.cart[existingItemIndex].quantity--;
      return {
        success: true,
        cart: this.cart,
      };
    }
    
    return {
      success: false,
      message: 'Sản phẩm không có trong giỏ hàng',
    };
  }

  // Xóa một sản phẩm khỏi giỏ
  removeFromCart(productId: string) {
    const initialLength = this.cart.length;
    this.cart = this.cart.filter(item => item.productId !== productId);
    console.log('Giỏ hàng sau khi xóa:', this.cart);
    return {
      success: this.cart.length < initialLength,
      cart: this.cart,
    };
  }
}
