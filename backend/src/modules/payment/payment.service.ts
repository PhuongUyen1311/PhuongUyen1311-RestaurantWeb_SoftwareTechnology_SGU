import { Injectable } from '@nestjs/common';
import { CartService, CartItem } from '../cart/cart.service';
import * as moment from 'moment';
import { VNPay, ignoreLogger, VnpLocale, ProductCode } from 'vnpay';

export interface PaymentInfo {
  items: CartItem[];
  cost: number;
  tax: number;
  note: string;
}

@Injectable()
export class PaymentService {
  constructor(private readonly cartService: CartService) { }


  private paymentInfo: PaymentInfo | null = null;

  getPaymentInfo(): PaymentInfo {
    const items = this.cartService.getCart();
    const costWithoutTax = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = costWithoutTax * 0.1;
    const cost = costWithoutTax + tax;

    const note = items
      .filter(item => item.note) // Chỉ giữ các item có note
      .map(item => `${item.name}: ${item.note.replace(/\n+/g, ', ').trim()}`)
      .join('\n');

    this.paymentInfo = { items, cost, tax, note };
    return this.paymentInfo;
  }

  clearPaymentInfo() {
    this.paymentInfo = null;
  }

  async createVnpayUrl(orderId: string): Promise<string> {
    const paymentInfo = this.getPaymentInfo();
    const amount = paymentInfo.cost;

    const vnpay = new VNPay({
      tmnCode: 'WJOEF7GQ',
      secureSecret: '3OPZE58IPH43YRKCKEJ0Q4FXRCV5MV2C',
      vnpayHost: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
      testMode: true,
      loggerFn: ignoreLogger,
    });

    const vnpayResponse = await vnpay.buildPaymentUrl({
      vnp_Amount: Math.round(amount * 1000),
      vnp_IpAddr: '127.0.0.1',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: paymentInfo.note || '',
      vnp_OrderType: ProductCode.Other, // thay 'other' nếu cần
      vnp_ReturnUrl: 'http://localhost:3000/payment/return',
      vnp_Locale: VnpLocale.VN,
      vnp_CreateDate: parseInt(moment().format('YYYYMMDDHHmmss')),
    });
    return vnpayResponse;
  }
}
