import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/service/database/database.module';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService, ...usersProviders],
})
export class UsersModule { }
