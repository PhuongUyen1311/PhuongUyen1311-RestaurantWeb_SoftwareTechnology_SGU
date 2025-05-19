import { Controller, Get, Post, Body} from '@nestjs/common';
import { PaymentService, PaymentInfo } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  getPaymentInfo(): PaymentInfo {
    return this.paymentService.getPaymentInfo();
  }

  @Post('vnpay')
  async createVnpayPayment(
    @Body() body: { orderId: string },
  ) {
    const paymentUrl = await  this.paymentService.createVnpayUrl(body.orderId);
    console.log(paymentUrl)
    return { paymentUrl };
  }

  @Post('clear')
  clearPaymentInfo() {
    this.paymentService.clearPaymentInfo();
    return { message: 'Payment information cleared successfully' };
  }
}

