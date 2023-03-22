import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { OrdersAssociation } from 'src/orders/orders.model';
import { OrdersService } from 'src/orders/orders.service';
import { passwordService } from 'src/service/password/password.service';
import { User } from './users.entity';
import { CreateUser, UserRoles, UserSearch } from './users.model';
@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: typeof User,
    private readonly ordersService: OrdersService,
  ) { }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne<User>({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne<User>({ where: { email } });
  }

  async getUsersOrders(id: number): Promise<OrdersAssociation[]> {
    const user = await this.findOne(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.ordersService.findByUser(id);
  }

  async create(user: CreateUser): Promise<User> {
    // Check if all required fields are present
    if (!user.email || !user.password || !user.firstname || !user.lastname) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Check if email is already in use
    const existingUser = await this.usersRepository.findOne<User>({
      where: { email: user.email },
    });
    if (existingUser) {
      throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
    }

    const checkUserRole = (role) => {
      if (UserRoles[role]) {
        return UserRoles[role];
      }
      throw new HttpException('Incorrect role', HttpStatus.BAD_REQUEST);
    }
    // Create user
    return this.usersRepository.create<User>({
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role ? checkUserRole(user.role) : UserRoles.USER,
      email: user.email,
      password: await passwordService.hash(user.password),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    const userToUpdate = await this.usersRepository.findOne<User>({
      where: { id },
    });
    if (!userToUpdate) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.password) {
      user.password = await passwordService.hash(user.password);
    }

    // Update user
    const updateResponse = await this.usersRepository.update<User>(user, {
      where: { id },
    });

    console.log(updateResponse);

    if (!updateResponse[0]) {
      throw new HttpException(
        "The user couldn't be updated!",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.usersRepository.findOne<User>({ where: { id } });
  }

  async delete(id: number): Promise<User> {
    const userToDelete = await this.usersRepository.findOne<User>({
      where: { id },
    });
    if (!userToDelete) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Delete user
    const deleteResponse = this.usersRepository.destroy({ where: { id } });

    if (!deleteResponse) {
      throw new HttpException(
        "The user couldn't be deleted!",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return userToDelete;
  }
}
