import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order, OrdersProducts } from '../orders/orders.entity';
import { Supplier } from '../suppliers/suppliers.entity';

@Table
export class Product extends Model {
  @Column
  name: string;

  @Column
  description: string;

  @Column
  ean13: string;

  @Column({ type: 'FLOAT' })
  price: number;

  @ForeignKey(() => Supplier)
  @Column
  supplierId: number;

  @BelongsTo(() => Supplier)
  supplier: Supplier;

  @BelongsToMany(() => Order, () => OrdersProducts)
  orders: Order[];

  @Column({ defaultValue: new Date() })
  createdAt: Date;

  @Column({ onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ defaultValue: null })
  deletedAt: Date | null;
}
