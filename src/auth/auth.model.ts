import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword, IsNotEmpty } from 'class-validator';

export interface LoginInterface {
  email: string
  password: string
}

export class AuthLogin {
  @ApiProperty({ type: 'string', format: 'binary' })
  email: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  password: string;
}

export class AuthRegister {
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  firstname: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  lastname: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
