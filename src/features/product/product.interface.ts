import { Document } from 'mongoose';

export interface Product {
  title: string;
  image: string;
  description: string;
  price: number;
  salePrice: number;
  category: number;
  stock: number;
  createdAt?: Date;
}

export interface ProductDocument extends Document {
  readonly title: string;
  readonly image: string;
  readonly description: string;
  readonly price: number;
  readonly category: string;
}

export type ProductDto = Product;
export type UpdateProductDto = Partial<ProductDto>;
