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
import { Product } from './products.entity';
import {
  ProductCreate,
  ProductDelete,
  ProductGetOne,
  ProductSearch,
} from './products.model';
import { ProductsService } from './products.service';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductPipe, UpdateProductPipe } from './products.validation.pipe';
@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  @Roles('SUPPLIER', 'ADMIN')
  @ApiBody({
    description: 'Create a product',
    type: ProductCreate,
  })
  @HttpCode(201)
  async create(@Body(CreateProductPipe) product: ProductCreate): Promise<Product> {
    return this.productsService.create(product);
  }

  @Patch(':id')
  @Roles('SUPPLIER', 'ADMIN')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateProductPipe) product: Partial<Product>,
  ): Promise<Product> {
    return this.productsService.update(id, product);
  }

  @Delete(':id')
  @Roles('SUPPLIER', 'ADMIN')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.delete(id);
  }
}
