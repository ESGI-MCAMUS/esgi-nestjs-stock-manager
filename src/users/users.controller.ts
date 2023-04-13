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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrdersAssociation } from 'src/orders/orders.model';
import { Roles } from 'src/roles/roles.decorator';
import { Supplier } from 'src/suppliers/suppliers.entity';
import { User } from './users.entity';
import { CreateUser, UserSearch } from './users.model';
import { UsersService } from './users.service';
import { CreateUserPipe, UpdateUserPipe } from './users.validation.pipe';
@ApiTags('Users')
@ApiBearerAuth()
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
  @Roles('USER', 'ADMIN', 'SUPPLIER')
  getUsersOrders(@Param('id') id: number): Promise<OrdersAssociation[]> {
    return this.usersService.getUsersOrders(id);
  }

  @Get(':id/supplier')
  @HttpCode(200)
  @Roles('USER', 'ADMIN', 'SUPPLIER')
  getUsersSupplier(@Param('id') id: number): Promise<Supplier> {
    return this.usersService.getUsersSupplier(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body(CreateUserPipe) user: CreateUser): Promise<User> {
    return this.usersService.create(user);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: number): Promise<User> {
    return this.usersService.delete(id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: number, @Body(UpdateUserPipe) user: Partial<User>): Promise<User> {
    return this.usersService.update(id, user);
  }
}
