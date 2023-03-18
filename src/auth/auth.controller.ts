import { Controller, UseGuards, Post, HttpCode, Logger, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUser } from 'src/users/users.model';

export interface LoginInterface {
    email: string
    password: string
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    @HttpCode(200)
    async login(@Body() body: LoginInterface) {
        return this.authService.login(body);
    }

    @Post('/register')
    @HttpCode(201)
    async register(@Body() body: CreateUser) {
        return this.authService.register(body);
    }
}