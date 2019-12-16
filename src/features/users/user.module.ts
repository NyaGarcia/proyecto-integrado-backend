import { Address } from './entities/address.entity';
import { Module } from '@nestjs/common';
import { Order } from '@orders/order.entity';
import { PaymentCard } from './entities/payment.entity';
import { SharedModule } from '@shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Address, Order, PaymentCard]),
    SharedModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
