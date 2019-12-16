import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from '@product/entities/product.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('blob')
  image: string;

  /*  @ManyToOne(
    type => Product,
    product => product.photos,
  )
  product: string; */
}
