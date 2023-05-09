import { Table, Column, Model, HasOne, HasMany } from 'sequelize-typescript';
import { Order } from '../orders/orders.entity';
import { Supplier } from '../suppliers/suppliers.entity';

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

  @HasOne(() => Supplier)
  supplier: Supplier;

  @HasMany(() => Order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    hooks: true,
  })
  orders: Order[];

  @Column
  createdAt: Date;

  @Column({ onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ defaultValue: null })
  deletedAt: Date | null;
}
