import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
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

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.ordersService.findOne(id);
  }

  @Post()
  @Roles('SUPPLIER', 'ADMIN')
  @ApiBody({
    description: 'Create an order',
    type: OrderCreate,
  })
  async create(@Body() order: CreateOrder) {
    return this.ordersService.create(order);
  }

  @Patch(':id')
  @Roles('SUPPLIER', 'ADMIN')
  async update(@Param('id') id: number, @Body() order: Partial<Order>) {
    return this.ordersService.update(id, order);
  }

  @Delete(':id')
  @Roles('SUPPLIER', 'ADMIN')
  async delete(@Param('id') id: number) {
    return this.ordersService.delete(id);
  }
}
