import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './modules/cart/cart.module';
import { FoodModule} from './modules/food/food.module';
import { PaymentModule } from './modules/payment/payment.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [CartModule, FoodModule, PaymentModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
