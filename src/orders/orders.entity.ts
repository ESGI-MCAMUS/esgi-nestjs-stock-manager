import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/products/products.entity';
import { User } from 'src/users/users.entity';

@Table
export class Order extends Model {
  @Column
  note: string;

  @ForeignKey(() => User)
  @Column
  orderedById: number;

  @BelongsTo(() => User)
  orderedBy: User;

  @BelongsToMany(() => Product, () => OrdersProducts)
  products: Product[];

  @Column
  createdAt: Date;

  @Column({ onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ defaultValue: null })
  deletedAt: Date | null;
}

@Table
export class OrdersProducts extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;
  @ForeignKey(() => Order)
  @Column
  orderId: number;

  @ForeignKey(() => Product)
  @Column
  productId: number;
}
