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
@Module({
  imports: [AuthModule],
  controllers: [AppController, AuthController, ProductsController, OrdersController, SuppliersController],
  providers: [AppService, ProductsService, OrdersService, SuppliersService],
})
export class AppModule { }
