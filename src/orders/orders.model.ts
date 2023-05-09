import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Product } from '../products/products.entity';
import { Order } from './orders.entity';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export interface CreateOrder {
  note: string;
  orderedBy: number;
  products: number[];
}

export interface OrdersAssociation extends Order {
  products: Product[];
}

export type OrderSearch = Partial<Order>;

export class OrderGetOne {
  @ApiProperty({ type: 'number', format: 'binary' })
  id: number;
  @ApiProperty({ type: 'string', format: 'binary' })
  note: string;
  @ApiProperty({ type: 'number', format: 'binary' })
  orderedById: number;
}

export class OrderCreate {
  @ApiProperty({ type: 'string', format: 'binary' })
  note: string;
  @ApiProperty({ type: 'number', format: 'binary' })
  orderedBy: number;
  products: number[];
}

export class OrderUpdate extends PartialType(OrderCreate) { }

export class OrderDelete {
  @ApiProperty({ type: 'number', format: 'binary' })
  id: number;
}
