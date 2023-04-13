import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

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
  firstname: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  lastname: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  email: string;
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsStrongPassword()
  password: string;
}
