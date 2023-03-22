import { User } from './users.entity';

export enum UserRoles {
  USER = "USER",
  SUPPLIER = "SUPPLIER",
  ADMIN = "ADMIN"
}
export interface CreateUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: UserRoles
}

export type UserSearch = Partial<User>;
