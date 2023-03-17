import { User } from './users.entity';

export interface CreateUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export type UserSearch = Partial<User>;
