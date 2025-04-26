import { Injectable } from '@nestjs/common';
import { CartService, CartItem } from '../cart/cart.service';

export interface PaymentInfo {
    items: CartItem[];
    cost: number;
    tax: number;
}

@Injectable()
export class PaymentService {
    constructor(private readonly cartService: CartService) { }

    getPaymentInfo(): PaymentInfo {
        const items = this.cartService.getCart(); // lấy sản phẩm từ cart
        const costWithOutTax = items.reduce((total, item) => total + item.price * item.quantity, 0); // tính tổng giá
        const tax = costWithOutTax * 0.1; // giả sử thuế là 10%
        const cost = costWithOutTax + tax; // tính tổng giá sau thuế
        
        return {
            items,
            cost,
            tax,
        };
    }
}
