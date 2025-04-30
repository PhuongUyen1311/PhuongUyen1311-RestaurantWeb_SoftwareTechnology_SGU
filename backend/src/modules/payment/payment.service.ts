import { Injectable } from '@nestjs/common';
import { CartService, CartItem } from '../cart/cart.service';
import * as crypto from 'crypto';
import { FoodService } from '../food/food.service';

export interface PaymentInfo {
  items: CartItem[];
  cost: number;
  tax: number;
  note: string;
}

@Injectable()
export class PaymentService {
  private vnp_TmnCode = 'PN1JF7UC'; // Thay bằng vnp_TmnCode từ VNPay Sandbox
  private vnp_HashSecret = 'OOBFBCGRTO3589TVOM8PWNE92XWFC9JC'; // Thay bằng vnp_HashSecret từ VNPay Sandbox
  private vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  private vnp_ReturnUrl = 'http://localhost:3000/payment/return'; // Cập nhật nếu dùng ngrok
  private vnp_IPNUrl = 'http://localhost:5000/payment/ipn'; // Cập nhật nếu dùng ngrok

  paymentInfo: PaymentInfo = {
    items: [],
    cost: 0,
    tax: 0,
    note: '',
  };

  constructor(
    private readonly cartService: CartService,
  ) { }

  getPaymentInfo(): PaymentInfo {
    const items = this.cartService.getCart();
    const costWithOutTax = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = costWithOutTax * 0.1;
    const cost = costWithOutTax + tax;
    const note = items.map(item => item.note).join('\n');

    return {
      items,
      cost,
      tax,
      note
    };
  }

  createVnpayUrl(amount: number, orderId: string, orderInfo: string, ipAddr: string): string {
    const date = new Date();
    const createDate = date.toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    const params: { [key: string]: string | number } = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: this.vnp_TmnCode,
      vnp_Amount: amount,
      vnp_CreateDate: createDate,
      vnp_CurrCode: 'VND',
      vnp_IpAddr: ipAddr || '127.0.0.1',
      vnp_Locale: 'vn',
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: 'billpayment',
      vnp_ReturnUrl: this.vnp_ReturnUrl,
      vnp_TxnRef: orderId,
    };
    console.log('params', params);
    // Sắp xếp params theo thứ tự alphabet
    const sortedParams = Object.keys(params)
      .sort()
      .reduce((obj, key) => {
        obj[key] = params[key];
        return obj;
      }, {} as { [key: string]: string | number });

    // Tạo chuỗi query
    const queryString = Object.keys(sortedParams)
      .map((key) => `${key}=${encodeURIComponent(sortedParams[key])}`)
      .join('&');

    // Tạo checksum
    const hmac = crypto.createHmac('sha512', this.vnp_HashSecret);
    const secureHash = hmac.update(queryString).digest('hex');

    return `${this.vnp_Url}?${queryString}&vnp_SecureHash=${secureHash}`;
  }

  verifyChecksum(params: { [key: string]: string }): boolean {
    const secureHash = params['vnp_SecureHash'];
    delete params['vnp_SecureHash'];

    const sortedParams = Object.keys(params)
      .sort()
      .reduce((obj, key) => {
        obj[key] = params[key];
        return obj;
      }, {} as { [key: string]: string });

    const queryString = Object.keys(sortedParams)
      .map((key) => `${key}=${encodeURIComponent(sortedParams[key])}`)
      .join('&');

    const hmac = crypto.createHmac('sha512', this.vnp_HashSecret);
    const calculatedHash = hmac.update(queryString).digest('hex');

    return secureHash === calculatedHash;
  }
  clearPaymentInfo(): void {
    this.paymentInfo = {
      items: [],
      cost: 0,
      tax: 0,
      note: '',
    };
    console.log('Payment info cleared');
  }
}