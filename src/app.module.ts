import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'features/auth/auth.module';
import { CategoryModule } from '@categories/category.module';
import { DatabaseModule } from '@core/database/database.module';
import { Module } from '@nestjs/common';
import { OrderModule } from '@orders/order.module';
import { ProductModule } from 'features/product/product.module';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    SharedModule,
    ProductModule,
    AuthModule,
    DatabaseModule,
    CategoryModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
