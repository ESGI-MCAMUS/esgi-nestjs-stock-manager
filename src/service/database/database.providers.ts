import { Sequelize } from 'sequelize-typescript';
import { Order, OrdersProducts } from '../../orders/orders.entity';
import { Product } from '../../products/products.entity';
import { Supplier } from '../../suppliers/suppliers.entity';
import { User } from '../../users/users.entity';
require('dotenv').config();

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.MYSQL_HOST || 'localhost',
        port: parseInt(process.env.MYSQL_PORT) || 3306,
        username: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'root',
        database: process.env.MYSQL_DATABASE || 'nest',
      });
      sequelize.addModels([User, Supplier, Product, Order, OrdersProducts]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
