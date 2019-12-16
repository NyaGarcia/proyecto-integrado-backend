import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Address } from './address.entity';
import { Order } from '@orders/order.entity';
import { PaymentCard } from './payment.entity';
import { Product } from '@product/entities/product.entity';

@Entity()
@Unique(['email', 'username'])
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: number;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(
    type => Address,
    address => address.user,
  )
  addresses: Array<Address>;

  @OneToMany(
    type => Order,
    order => order.user,
  )
  orders: Array<Order>;

  @OneToMany(
    type => PaymentCard,
    payment => payment.user,
  )
  cards: Array<PaymentCard>;

  @ManyToMany(type => Product)
  @JoinTable({ name: 'wishlist' })
  favoriteProducts: Array<Product>;
}
