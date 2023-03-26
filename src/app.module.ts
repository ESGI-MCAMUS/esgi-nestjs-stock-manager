import { Module } from '@nestjs/common';
import {APP_FILTER, APP_GUARD} from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { OrdersController } from './orders/orders.controller';
import { SuppliersController } from './suppliers/suppliers.controller';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { HttpExceptionFilter } from '../middleware/sentry.middleware';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseBackupService } from './db-backup/db-backup.service';
import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler';
@Module({
  imports: [
    AuthModule,
    OrdersModule,
    ProductsModule,
    SuppliersModule,
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  controllers: [
    AppController,
    AuthController,
    OrdersController,
    ProductsController,
    SuppliersController,
  ],
  providers: [
    AppService,
    DatabaseBackupService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule { }
