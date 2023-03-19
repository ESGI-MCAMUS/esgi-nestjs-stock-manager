import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
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

@ApiTags('Suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get()
  findAll(): Promise<Supplier[]> {
    return this.suppliersService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: number): Promise<Supplier> {
    return this.suppliersService.findOne(id);
  }

  @Post()
  @ApiBody({
    description: 'Create a supplier',
    type: SupplierCreate,
  })
  @HttpCode(201)
  create(@Body() supplier: CreateSupplier): Promise<Supplier> {
    return this.suppliersService.create(supplier);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: number): Promise<Supplier> {
    return this.suppliersService.delete(id);
  }

  @Patch(':id')
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
