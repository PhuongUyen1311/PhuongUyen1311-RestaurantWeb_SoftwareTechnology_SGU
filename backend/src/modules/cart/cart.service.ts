import { Injectable } from '@nestjs/common';
import { FoodService } from '../food/food.service';
import { writeItemsJson } from 'src/common/utils/writeJson';
import { readItemsJson } from 'src/common/utils/readJson';
const cartFilePath = '../src/storage/CartItems.json';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  category: string;
  currentQuantity: number;
  quantity: number;
  note: string;
}

@Injectable()
export class CartService {
  private cart: CartItem[] = Array.isArray(readItemsJson(cartFilePath))
    ? readItemsJson(cartFilePath).filter(item => item.currentQuantity > 0)
    : [];
  constructor(private readonly foodService: FoodService) { }

  private saveCart() {
    writeItemsJson(cartFilePath, this.cart);
  }

  async addToCart(id: string, quantity: number, note: string) {
    const foodItem = await this.foodService.getFoodById(id);
    const existingItemIndex = this.cart.findIndex(item => item.id === id);
    if (existingItemIndex !== -1) {
      // Nếu sản phẩm đã có trong giỏ, tăng số lượng
      this.cart[existingItemIndex].note += "\n" + (note || '');
      this.cart[existingItemIndex].quantity += quantity;
      if (this.cart[existingItemIndex].quantity > 99) {
        this.cart[existingItemIndex].quantity = 99;
      }

      if (this.cart[existingItemIndex].quantity > foodItem.currentQuantity) {
        this.cart[existingItemIndex].quantity = foodItem.currentQuantity;
      }



    } else {
      // Nếu chưa có, thêm sản phẩm mới vào giỏ
      this.cart.push({
        id: foodItem.id,
        name: foodItem.name,
        price: foodItem.price,
        category: foodItem.category,
        currentQuantity: foodItem.currentQuantity,
        quantity: quantity,
        note: note || ''
      });

    }
    this.saveCart();
    return {
      success: true,
      cart: this.cart,
    };
  }

  getCart() {
    return readItemsJson(cartFilePath);
  }


  clearCart() {
    this.cart = [];
    this.saveCart();
    return { success: true };
  }


  async getCartItems(id: string) {
    const foodItem = await this.foodService.getFoodById(id);
    return foodItem;
  }

  async increaseQuantity(id: string) {
    const foodItem = await this.foodService.getFoodById(id);
    const maxAvailable = foodItem.currentQuantity;
    const existingItem = this.cart.find(item => item.id === id);
    if (existingItem) {
      if (existingItem.quantity >= 99) {
        this.saveCart();
        return {
          success: false,
          message: 'Không thể thêm quá 99 sản phẩm cho mỗi mặt hàng',
        };
      }
      const maxCanAdd = maxAvailable - existingItem.quantity;
      if (maxCanAdd <= 0) {
        this.saveCart();
        return {
          success: false,
          message: 'Số lượng sản phẩm trong giỏ đã đạt mức tối đa có thể mua',
        };
      }
      existingItem.quantity += 1;
      this.saveCart();
      return {
        success: true,
        cart: this.cart,
      };
    }
    else {
      // Nếu sản phẩm chưa có trong giỏ, thêm mới
      this.cart.push({
        id: foodItem.id,
        name: foodItem.name,
        price: foodItem.price,
        category: foodItem.category,
        currentQuantity: foodItem.currentQuantity,
        quantity: 1,
        note: ''
      });
      this.saveCart();
      return {
        success: true,
        cart: this.cart,
      };
    }
  }

  decreaseQuantity(id: string) {
    const existingItemIndex = this.cart.findIndex(item => item.id === id);
    if (existingItemIndex === -1) return { success: false };

    if (this.cart[existingItemIndex].quantity <= 1) {
      this.cart[existingItemIndex].quantity = 1;

    } else {
      this.cart[existingItemIndex].quantity--;
    }
    this.saveCart();

    return { success: true, cart: this.cart };
  }
  removeFromCart(id: string) {
    const initialLength = this.cart.length;
    this.cart = this.cart.filter(item => item.id !== id);
    this.saveCart();
    return {
      success: this.cart.length < initialLength,
      cart: this.cart,
    };
  }

  async updateCartItem(id: string, quantity: number, note: string) {
    const existingItemIndex = this.cart.findIndex(item => item.id === id);
    if (existingItemIndex === -1) {
      return {
        success: false,
        message: 'Sản phẩm không tồn tại trong giỏ hàng',
      };
    }

    if (quantity <= 0) {
      return this.removeFromCart(id);
    }

    if (quantity > 99) {
      return {
        success: false,
        message: 'Không thể cập nhật số lượng vượt quá 99',
      };
    }

    try {
      const foodItem = await this.foodService.getFoodById(id);
      if (quantity > foodItem.currentQuantity) {
        return {
          success: false,
          message: 'Số lượng cập nhật vượt quá số lượng hiện có trong kho',
        };
      }

      this.cart[existingItemIndex].quantity = quantity;
      this.cart[existingItemIndex].note = note || ''
      this.saveCart();
      return {
        success: true,
        cart: this.cart,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Không thể xác thực thông tin sản phẩm',
      };
    }
  }
}
export default CartService;