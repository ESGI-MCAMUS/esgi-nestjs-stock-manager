import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUser } from '../users/users.model';
import { passwordService } from '../service/password/password.service';
import { LoginInterface } from './auth.model';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(email);
      if (await passwordService.verify(pass, user.password)) {
        const { password, ...result } = user;
        return result;
      }
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async login(req: LoginInterface) {
    try {
      const user = await this.usersService.findByEmail(req.email);
      if (await passwordService.verify(req.password, user.password)) {
        const payload = {
          id: user.id,
          role: user.role,
        };
        return {
          ...user,
          access_token: this.jwtService.sign(payload),
        };
      }
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  async register(user: CreateUser) {
    try {
      return this.usersService.create(user);
    } catch (error) {
      throw error;
    }
  }
}
