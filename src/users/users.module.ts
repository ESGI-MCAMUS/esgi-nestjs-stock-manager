import { Module } from '@nestjs/common';
import { ordersProviders } from 'src/orders/orders.providers';
import { OrdersService } from 'src/orders/orders.service';
import { DatabaseModule } from 'src/service/database/database.module';
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
  ],
})
export class UsersModule {}
