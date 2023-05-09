import { Module } from '@nestjs/common';
import { ordersProviders } from '../orders/orders.providers';
import { OrdersService } from '../orders/orders.service';
import { DatabaseModule } from '../service/database/database.module';
import { suppliersProviders } from '../suppliers/suppliers.providers';
import { SuppliersService } from '../suppliers/suppliers.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [
    UsersService,
    ...usersProviders,
    OrdersService,
    ...ordersProviders,
    SuppliersService,
    ...suppliersProviders
  ],
})
export class UsersModule { }
