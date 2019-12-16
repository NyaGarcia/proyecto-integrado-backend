import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository, DeleteResult } from 'typeorm';
import { OrderDto } from './order.interface';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  findAll(): Promise<Order[]> {
    return this.orderRepository.find({});
  }

  findById(id: number): Promise<Order> {
    return this.orderRepository.findOne({ where: { id } });
  }

  addOrder(orderDto: OrderDto): Promise<Order> {
    const order = this.orderRepository.create(orderDto);
    order.createdAt = new Date();
    return this.orderRepository.save(order);
  }

  deleteOrder(id: number): Promise<DeleteResult> {
    return this.orderRepository.delete(id);
  }

  getUserOrders(userId: number): Promise<Order[]> {
    return this.orderRepository.find({ where: { user: { id: userId } } });
  }
}
