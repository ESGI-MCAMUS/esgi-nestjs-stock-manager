import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Product } from './products.entity';
import { IsNumberString, IsNotEmpty, IsString, IsNumber, IsEAN } from 'class-validator';

export interface CreateProduct {
  name: string;
  description: string;
  ean13: string;
  price: number;
  supplierId: number;
}

export type ProductSearch = Partial<Product>;

export class ProductGetOne {
  @ApiProperty({ type: 'number', format: 'binary' })
  id: number;
  @ApiProperty({ type: 'string', format: 'binary' })
  name: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  description: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  ean13: string;
  @ApiProperty({ type: 'number', format: 'binary' })
  price: number;
  @ApiProperty({ type: 'number', format: 'binary' })
  supplierId: number;
}

export class ProductCreate {
  @ApiProperty({ type: 'string', format: 'binary' })
  name: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  description: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsEAN()
  ean13: string;
  @ApiProperty({ type: 'number', format: 'binary' })
  price: number;
  @ApiProperty({ type: 'number', format: 'binary' })
  supplierId: number;
}

export class ProductUpdate extends PartialType(ProductCreate) { }

export class ProductDelete {
  @ApiProperty({ type: 'number', format: 'binary' })
  id: number;
}
