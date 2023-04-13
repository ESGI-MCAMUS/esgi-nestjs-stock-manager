import { Module } from '@nestjs/common';
import { DatabaseModule } from '../service/database/database.module';
import { suppliersProviders } from '../suppliers/suppliers.providers';
import { ProductsController } from './products.controller';
import { productsProviders } from './products.providers';
import { ProductsService } from './products.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  exports: [ProductsService],
  providers: [ProductsService, ...productsProviders, ...suppliersProviders],
})
export class ProductsModule {}
