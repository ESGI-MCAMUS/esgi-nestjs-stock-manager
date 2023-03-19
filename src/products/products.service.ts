import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Supplier } from 'src/suppliers/suppliers.entity';
import { Product } from './products.entity';
import { CreateProduct, ProductSearch } from './products.model';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private readonly productsRepository: typeof Product,
    @Inject('SUPPLIERS_REPOSITORY')
    private readonly suppliersRepository: typeof Supplier,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.findAll<Product>();
  }

  async findOne(id: number): Promise<Product> {
    return this.productsRepository.findOne<Product>({ where: { id } });
  }

  async create(product: CreateProduct): Promise<Product> {
    if (
      !product.name ||
      !product.description ||
      !product.ean13 ||
      !product.price ||
      !product.supplierId
    ) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    const supplier = await this.suppliersRepository.findOne<Supplier>({
      where: { id: product.supplierId },
    });

    if (!supplier) {
      throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
    }

    const res = await this.productsRepository.create<Product>({
      name: product.name,
      description: product.description,
      ean13: product.ean13,
      price: product.price,
      supplierId: product.supplierId,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    return res;
  }

  async update(id: number, product: Partial<Product>): Promise<Product> {
    const productToUpdate = await this.productsRepository.findOne<Product>({
      where: { id },
    });

    if (!productToUpdate) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    const res = await productToUpdate.update(product);

    return res;
  }

  async delete(id: number): Promise<Product> {
    const productToDelete = await this.productsRepository.findOne<Product>({
      where: { id },
    });

    if (!productToDelete) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    await productToDelete.destroy();

    return productToDelete;
  }
}
