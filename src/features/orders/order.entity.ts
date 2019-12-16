import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from '@product/entities/product.entity';
import { User } from '@users/entities/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(
    type => User,
    user => user.orders,
  )
  user: string;

  @ManyToMany(type => Product)
  @JoinTable({ name: 'orders_products' })
  products: Array<Product>;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
