import { Address } from '@users/entities/address.entity';
import { Category } from '@categories/category.entity';
import { Module } from '@nestjs/common';
import { Order } from '@orders/order.entity';
import { PaymentCard } from '@users/entities/payment.entity';
import { Photo } from '@product/entities/photo.entity';
import { Product } from '@product/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [Category, Product, Photo, User, Address, Order, PaymentCard],
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'secretpassword',
      database: 'shopify',
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
