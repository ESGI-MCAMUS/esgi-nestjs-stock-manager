import { Supplier } from './suppliers.entity';

export const suppliersProviders = [
  {
    provide: 'SUPPLIERS_REPOSITORY',
    useValue: Supplier,
  },
];
