import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '@users/entities/user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  address: string;

  @Column()
  address2: string;

  @Column()
  postalCode: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  type: string; // Example: Billing or shipping address

  @ManyToOne(
    type => User,
    user => user.addresses,
  )
  user: User;
}
