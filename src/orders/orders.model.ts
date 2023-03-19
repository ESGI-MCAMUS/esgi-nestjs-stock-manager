import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/products.entity';
import { User } from 'src/users/users.entity';
import { Order } from './orders.entity';

export interface CreateOrder {
  orderedBy: User;
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
  orderedById: number;
  products: Product[];
}

export class OrderUpdate {
  @ApiProperty({ type: 'string', format: 'binary' })
  note: string;
  @ApiProperty({ type: 'number', format: 'binary' })
  orderedBy: number;
}

export class OrderDelete {
  @ApiProperty({ type: 'number', format: 'binary' })
  id: number;
}
