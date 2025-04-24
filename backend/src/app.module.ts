import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './modules/cart/cart.module';
import { FoodModule} from './modules/food/food.module';
@Module({
  imports: [CartModule, FoodModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
