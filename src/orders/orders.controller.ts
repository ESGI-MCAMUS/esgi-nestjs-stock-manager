import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Order } from './orders.entity';
import {
  CreateOrder,
  OrderCreate,
  OrderGetOne,
  OrderSearch,
  OrderUpdate,
} from './orders.model';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.ordersService.findOne(id);
  }

  @Post()
  @ApiBody({
    description: 'Create an order',
    type: OrderCreate,
  })
  async create(@Body() order: CreateOrder) {
    return this.ordersService.create(order);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() order: Partial<Order>) {
    return this.ordersService.update(id, order);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.ordersService.delete(id);
  }
}
