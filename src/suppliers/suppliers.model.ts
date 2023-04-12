import { ApiProperty, PartialType } from '@nestjs/swagger';
import { User } from 'src/users/users.entity';
import { Supplier } from './suppliers.entity';
import { IsNumberString, IsEmail, IsNotEmpty, IsString } from 'class-validator';
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
    @IsNumberString()
    @IsNotEmpty()
    id: number;
    @ApiProperty({ type: 'string', format: 'binary' })
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty({ type: 'string', format: 'binary' })
    @IsNotEmpty()
    @IsString()
    address: string;
    @ApiProperty({ type: 'string', format: 'binary' })
    phone: string;
    @ApiProperty({ type: 'string', format: 'binary' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @ApiProperty({ type: 'number', format: 'binary' })
    userId: number;
}

export class SupplierCreate {
    @ApiProperty({ type: 'string', format: 'binary' })
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty({ type: 'string', format: 'binary' })
    @IsString()
    @IsNotEmpty()
    address: string;
    @ApiProperty({ type: 'string', format: 'binary' })
    @IsString()
    phone: string;
    @ApiProperty({ type: 'string', format: 'binary' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @ApiProperty({ type: 'number', format: 'binary' })
    userId: number;
}

export class SupplierUpdate extends PartialType(SupplierCreate) { }
export class SupplierDelete {
    @ApiProperty({ type: 'number', format: 'binary' })
    @IsNotEmpty()
    @IsNumberString()
    id: number;
}
