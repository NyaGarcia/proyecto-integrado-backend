import {
  Controller,
  UseFilters,
  Get,
  Param,
  UseGuards,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { GeneralExceptionsFilter } from '@shared/general-exception.filter';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { AuthGuard } from '@nestjs/passport';
import { OrderDto } from './order.interface';

@Controller('order')
@UseFilters(new GeneralExceptionsFilter())
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  findAllOrders(): Promise<Array<Order>> {
    return this.orderService.findAll();
  }

  @Get('user/:userId')
  getUserOrders(@Param('userId') userId: number): Promise<Order[]> {
    return this.orderService.getUserOrders(userId);
  }

  @Get(':id')
  findById(@Param() id: number): Promise<Order> {
    return this.orderService.findById(id);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Post()
  addOrder(@Body() orderDto: OrderDto): Promise<Order> {
    return this.orderService.addOrder(orderDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    const result = await this.orderService.deleteOrder(id);

    if (!result.affected) {
      throw new HttpException(
        'Order could not be deleted',
        HttpStatus.NOT_FOUND,
      );
    }

    return id;
  }
}
