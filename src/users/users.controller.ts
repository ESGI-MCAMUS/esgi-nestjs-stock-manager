import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Logger,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrdersAssociation } from 'src/orders/orders.model';
import { User } from './users.entity';
import { CreateUser, UserSearch } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @HttpCode(200)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param() id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get(':id/orders')
  @HttpCode(200)
  getUsersOrders(@Param('id') id: number): Promise<OrdersAssociation[]> {
    return this.usersService.getUsersOrders(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() user: CreateUser): Promise<User> {
    return this.usersService.create(user);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: number): Promise<User> {
    return this.usersService.delete(id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: number, @Body() user: Partial<User>): Promise<User> {
    return this.usersService.update(id, user);
  }
}
