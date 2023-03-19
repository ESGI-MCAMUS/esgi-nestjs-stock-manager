import { Order } from './orders.entity';

export const ordersProviders = [
  {
    provide: 'ORDERS_REPOSITORY',
    useValue: Order,
  },
];
