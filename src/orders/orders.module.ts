import { Module } from '@nestjs/common';
import { DatabaseModule } from '../service/database/database.module';
import { OrdersController } from './orders.controller';
import { ordersProviders } from './orders.providers';
import { OrdersService } from './orders.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrdersController],
  exports: [OrdersService],
  providers: [OrdersService, ...ordersProviders],
})
export class OrdersModule {}
