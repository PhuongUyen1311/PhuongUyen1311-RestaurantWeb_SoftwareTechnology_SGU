import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { PaymentService, PaymentInfo } from './payment.service';
import { Request, Response } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Get()
  getPaymentInfo(): PaymentInfo {
    return this.paymentService.getPaymentInfo();
  }

  @Post('vnpay')
  async createVnpayPayment(
    @Body() body: { amount: number; orderId: string; orderInfo: string },
    @Req() req: Request,
  ) {
    const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const paymentUrl = this.paymentService.createVnpayUrl(
      body.amount,
      body.orderId,
      body.orderInfo,
      ipAddr as string,
    );
    return { paymentUrl };
  }

  @Post('ipn')
  async handleIpn(@Body() params: { [key: string]: string }, @Res() res: Response) {
    const isValid = this.paymentService.verifyChecksum(params);
    const response = { RspCode: '', Message: '' };

    if (!isValid) {
      response.RspCode = '97';
      response.Message = 'Invalid checksum';
    } else {
      const responseCode = params['vnp_ResponseCode'];
      if (responseCode === '00') {
        response.RspCode = '00';
        response.Message = 'Confirm Success';
      } else {
        response.RspCode = '01';
        response.Message = 'Transaction Failed';
      }
    }

    res.json(response);
  }
  
}