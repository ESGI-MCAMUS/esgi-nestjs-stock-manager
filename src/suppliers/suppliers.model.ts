import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.entity';
import { Supplier } from './suppliers.entity';

export interface CreateSupplier {
  name: string;
  address: string;
  phone: string;
  email: string;
  userId: number;
}

export type SupplierSearch = Partial<Supplier>;

export class SupplierGetOne {
  @ApiProperty({ type: 'number', format: 'binary' })
  id: number;
  @ApiProperty({ type: 'string', format: 'binary' })
  name: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  address: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  phone: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  email: string;
  @ApiProperty({ type: 'number', format: 'binary' })
  userId: number;
}

export class SupplierCreate {
  @ApiProperty({ type: 'string', format: 'binary' })
  name: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  address: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  phone: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  email: string;
  @ApiProperty({ type: 'number', format: 'binary' })
  userId: number;
}

export class SupplierUpdate {
  @ApiProperty({ type: 'string', format: 'binary' })
  name: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  address: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  phone: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  email: string;
  @ApiProperty({ type: 'number', format: 'binary' })
  user: number;
}

export class SupplierDelete {
  @ApiProperty({ type: 'number', format: 'binary' })
  id: number;
}
