import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards, Version
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { Order } from './orders.entity';
import {
  CreateOrder,
  OrderCreate,
  OrderGetOne,
  OrderSearch,
  OrderUpdate,
} from './orders.model';
import { OrdersService } from './orders.service';
import { CreateOrderPipe, UpdateOrderPipe } from './orders.validation.pipe';
@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }

  @Version('2')
  @Get()
  async findAllv2() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Post()
  @ApiBody({
    description: 'Create an order',
    type: OrderCreate,
  })
  async create(@Body(CreateOrderPipe) order: CreateOrder) {
    return this.ordersService.create(order);
  }

  @Patch(':id')
  @Roles('SUPPLIER', 'ADMIN')
  async update(@Param('id', ParseIntPipe) id: number, @Body(UpdateOrderPipe) order: Partial<Order>) {
    return this.ordersService.update(id, order);
  }

  @Delete(':id')
  @Roles('SUPPLIER', 'ADMIN')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.delete(id);
  }
}
