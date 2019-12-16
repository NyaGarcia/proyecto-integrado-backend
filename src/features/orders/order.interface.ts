import { Product } from '@product/entities/product.entity';

export interface Order {
  id?: string;
  user: string;
  description: string;
  products: Product[];
}

export type OrderDto = Order;
