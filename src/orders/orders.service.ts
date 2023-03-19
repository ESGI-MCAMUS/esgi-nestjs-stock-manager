import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Product } from 'src/products/products.entity';
import { Order, OrdersProducts } from './orders.entity';
import { CreateOrder, OrdersAssociation, OrderSearch } from './orders.model';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDERS_REPOSITORY')
    private readonly ordersRepository: typeof Order,
    @Inject('ORDERS_PRODUCTS_REPOSITORY')
    private readonly ordersProductsRepository: typeof OrdersProducts,
    @Inject('PRODUCTS_REPOSITORY')
    private readonly productsRepository: typeof Product,
  ) {}

  async findAll(): Promise<OrdersAssociation[]> {
    return this.ordersRepository.findAll<Order>({
      include: [
        {
          model: this.productsRepository,
          as: 'products',
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  async findOne(id: number): Promise<OrdersAssociation> {
    return await this.ordersRepository.findOne<Order>({
      where: { id },
      include: [
        {
          model: this.productsRepository,
          as: 'products',
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  async findByUser(id: number): Promise<OrdersAssociation[]> {
    return await this.ordersRepository.findAll<Order>({
      where: { orderedById: id },
      include: [
        {
          model: this.productsRepository,
          as: 'products',
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  async create(order: CreateOrder): Promise<Order> {
    if (!order.orderedBy || !order.products || !order.note) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    const res = await this.ordersRepository.create<Order>({
      orderedById: order.orderedBy,
      note: order.note,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    await order.products.map(
      async (product) =>
        await this.ordersProductsRepository.create<OrdersProducts>({
          orderId: res.id,
          productId: product,
        }),
    );

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
