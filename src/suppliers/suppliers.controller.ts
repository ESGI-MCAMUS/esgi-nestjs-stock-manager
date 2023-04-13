import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Product } from '../products/products.entity';
import { Roles } from '../roles/roles.decorator';
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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { CreateSupplierPipe, UpdateSupplierPipe } from './suppliers.validation.pipe';
@ApiTags('Suppliers')
@ApiBearerAuth()
@Controller('suppliers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) { }

  @Get()
  findAll(): Promise<Supplier[]> {
    return this.suppliersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Supplier> {
    return this.suppliersService.findOne(id);
  }

  @Get(':id/products')
  getSuppliersProducts(@Param('id', ParseIntPipe) id: number): Promise<Product[]> {
    return this.suppliersService.getSuppliersProducts(id);
  }

  @Post()
  @Roles('SUPPLIER', 'ADMIN')
  @ApiBody({
    description: 'Create a supplier',
    type: SupplierCreate,
  })
  @HttpCode(201)
  create(@Body(CreateSupplierPipe) supplier: CreateSupplier): Promise<Supplier> {
    return this.suppliersService.create(supplier);
  }

  @Delete(':id')
  @Roles('SUPPLIER', 'ADMIN')
  @HttpCode(204)
  delete(@Param('id', ParseIntPipe) id: number): Promise<Supplier> {
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
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateSupplierPipe) supplier: Partial<Supplier>,
  ): Promise<Supplier> {
    return this.suppliersService.update(id, supplier);
  }
}
