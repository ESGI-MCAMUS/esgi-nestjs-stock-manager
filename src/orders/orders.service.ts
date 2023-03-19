import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Order } from './orders.entity';
import { CreateOrder, OrderSearch } from './orders.model';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDERS_REPOSITORY')
    private readonly ordersRepository: typeof Order,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.findAll<Order>();
  }

  async findOne(id: number): Promise<Order> {
    return this.ordersRepository.findOne<Order>({ where: { id } });
  }

  async create(order: CreateOrder): Promise<Order> {
    if (!order.orderedBy || !order.products) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    const res = await this.ordersRepository.create<Order>({
      orderedBy: order.orderedBy,
      products: order.products,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    return res;
  }

  async update(id: number, order: Partial<Order>): Promise<Order> {
    const orderToUpdate = await this.ordersRepository.findOne<Order>({
      where: { id },
    });

    if (!orderToUpdate) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    const res = await orderToUpdate.update(order);

    return res;
  }

  async delete(id: number): Promise<Order> {
    const orderToDelete = await this.ordersRepository.findOne<Order>({
      where: { id },
    });

    if (!orderToDelete) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    await orderToDelete.destroy();

    return orderToDelete;
  }
}
