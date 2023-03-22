import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Product } from 'src/products/products.entity';
import { Roles } from 'src/roles/roles.decorator';
import { Supplier } from './suppliers.entity';
import {
  CreateSupplier,
  SupplierCreate,
  SupplierDelete,
  SupplierGetOne,
  SupplierSearch,
  SupplierUpdate,
} from './suppliers.model';
import { SuppliersService } from './suppliers.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
@ApiTags('Suppliers')
@Controller('suppliers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) { }

  @Get()
  findAll(): Promise<Supplier[]> {
    return this.suppliersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Supplier> {
    return this.suppliersService.findOne(id);
  }

  @Get(':id/products')
  getSuppliersProducts(@Param('id') id: number): Promise<Product[]> {
    return this.suppliersService.getSuppliersProducts(id);
  }

  @Post()
  @Roles('SUPPLIER', 'ADMIN')
  @ApiBody({
    description: 'Create a supplier',
    type: SupplierCreate,
  })
  @HttpCode(201)
  create(@Body() supplier: CreateSupplier): Promise<Supplier> {
    return this.suppliersService.create(supplier);
  }

  @Delete(':id')
  @Roles('SUPPLIER', 'ADMIN')
  @HttpCode(204)
  delete(@Param('id') id: number): Promise<Supplier> {
    return this.suppliersService.delete(id);
  }

  @Patch(':id')
  @Roles('SUPPLIER', 'ADMIN')
  @ApiBody({
    description: 'Update a supplier',
    type: SupplierUpdate,
  })
  @HttpCode(200)
  update(
    @Param('id') id: number,
    @Body() supplier: Partial<Supplier>,
  ): Promise<Supplier> {
    return this.suppliersService.update(id, supplier);
  }
}
