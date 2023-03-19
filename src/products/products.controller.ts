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
import { Product } from './products.entity';
import {
  ProductCreate,
  ProductDelete,
  ProductGetOne,
  ProductSearch,
} from './products.model';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiBody({
    description: 'Create a product',
    type: ProductCreate,
  })
  @HttpCode(201)
  async create(@Body() product: ProductCreate): Promise<Product> {
    return this.productsService.create(product);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() product: Partial<Product>,
  ): Promise<Product> {
    return this.productsService.update(id, product);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<Product> {
    return this.productsService.delete(id);
  }
}
