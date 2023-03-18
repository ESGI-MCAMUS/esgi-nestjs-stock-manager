import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from './users.entity';
import { CreateUser, UserSearch } from './users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @HttpCode(200)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get()
  @HttpCode(200)
  findOne(@Body() query: UserSearch): Promise<User> {
    return this.usersService.findOne(query as any);
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
