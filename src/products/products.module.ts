import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/service/database/database.module';
import { suppliersProviders } from 'src/suppliers/suppliers.providers';
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
