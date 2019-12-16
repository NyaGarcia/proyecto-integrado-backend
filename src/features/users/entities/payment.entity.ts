import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity()
export class PaymentCard {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  type: string; //debit, credit etc.

  @Column()
  cardNumber: number;

  @Column()
  holder: string; //titular

  @CreateDateColumn()
  expirationDate: Date;

  @ManyToOne(
    type => User,
    user => user.cards,
  )
  user: string;
}
