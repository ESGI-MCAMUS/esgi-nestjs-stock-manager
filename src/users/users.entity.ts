import { Table, Column, Model, HasOne, HasMany } from 'sequelize-typescript';
import { Order } from 'src/orders/orders.entity';
import { Supplier } from 'src/suppliers/suppliers.entity';

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

  @HasMany(() => Order)
  orders: Order[];

  @Column
  createdAt: Date;

  @Column({ onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ defaultValue: null })
  deletedAt: Date | null;
}
