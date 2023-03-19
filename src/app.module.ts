import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { SuppliersController } from './suppliers/suppliers.controller';
import { SuppliersService } from './suppliers/suppliers.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { SuppliersModule } from './suppliers/suppliers.module';
@Module({
  imports: [AuthModule, OrdersModule, ProductsModule, SuppliersModule],
  controllers: [
    AppController,
    AuthController,
    OrdersController,
    ProductsController,
    SuppliersController,
  ],
  providers: [AppService],
})
export class AppModule {}
