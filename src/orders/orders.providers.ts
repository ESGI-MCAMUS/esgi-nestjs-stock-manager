import { Product } from 'src/products/products.entity';
import { Order, OrdersProducts } from './orders.entity';

export const ordersProviders = [
  {
    provide: 'ORDERS_REPOSITORY',
    useValue: Order,
  },
  {
    provide: 'ORDERS_PRODUCTS_REPOSITORY',
    useValue: OrdersProducts,
  },
  {
    provide: 'PRODUCTS_REPOSITORY',
    useValue: Product,
  },
];
