import { Controller, UseGuards, Post, HttpCode, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUser, UserRoles } from 'src/users/users.model';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthLogin, AuthRegister, LoginInterface } from './auth.model';
import { CreateUserPipe, LoginUserPipe } from 'src/users/users.validation.pipe';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({
    description: 'Login the user',
    type: AuthLogin,
  })
  @HttpCode(200)
  async login(@Body(LoginUserPipe) body: LoginInterface) {
    return this.authService.login(body);
  }

  @Post('/register')
  @ApiBody({
    description: 'Register a user',
    type: AuthRegister,
  })
  @HttpCode(201)
  async register(@Body(CreateUserPipe) body: CreateUser) {
    return this.authService.register(body);
  }
}
