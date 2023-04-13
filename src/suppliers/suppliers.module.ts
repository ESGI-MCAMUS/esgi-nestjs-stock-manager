import { Module } from '@nestjs/common';
import { DatabaseModule } from '../service/database/database.module';
import { SuppliersController } from './suppliers.controller';
import { suppliersProviders } from './suppliers.providers';
import { SuppliersService } from './suppliers.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SuppliersController],
  exports: [SuppliersService],
  providers: [SuppliersService, ...suppliersProviders],
})
export class SuppliersModule {}
