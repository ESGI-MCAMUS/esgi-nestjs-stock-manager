import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { CreateOrder } from "./orders.model";
import { OrdersProducts } from "./orders.entity";

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService, OrdersProducts],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an order with the given parameters', async () => {
      const order: CreateOrder = {
        orderedBy: 1,
        note: 'Test order',
        products: [1, 2, 3],
      };
      const result = await service.create(order);
      expect(result).toBeDefined();
      expect(result.orderedById).toEqual(order.orderedBy);
      expect(result.note).toEqual(order.note);
      expect(result.deletedAt).toBeNull();
      expect(result.products.length).toEqual(order.products.length);
    });

    it('should throw an exception if required fields are missing', async () => {
      const order: CreateOrder = {
        orderedBy: 1,
        note: '',
        products: [],
      };
      await expect(service.create(order)).rejects.toThrow();
    });
  });
});