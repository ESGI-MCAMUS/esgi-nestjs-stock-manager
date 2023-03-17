import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  firstname: string;

  @Column
  lastname: string;

  @Column
  role: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  createdAt: Date;

  @Column({ onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ defaultValue: null })
  deletedAt: Date | null;
}
