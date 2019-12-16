import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from '@categories/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('double')
  salePrice: number;

  @Column('double')
  price: number;

  @ManyToOne(
    type => Category,
    category => category.id,
  )
  category: number;

  /* @OneToMany(
    type => Photo,
    photo => photo.product,
  )
  photos: Array<Photo>; */

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 40 })
  stock: number;
}
