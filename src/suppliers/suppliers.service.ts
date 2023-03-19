import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Product } from 'src/products/products.entity';
import { Supplier } from './suppliers.entity';
import { CreateSupplier, SupplierSearch } from './suppliers.model';

@Injectable()
export class SuppliersService {
  constructor(
    @Inject('SUPPLIERS_REPOSITORY')
    private readonly suppliersRepository: typeof Supplier,
  ) {}

  async findAll(): Promise<Supplier[]> {
    return await this.suppliersRepository.findAll<Supplier>();
  }

  async findOne(id: number): Promise<Supplier> {
    return await this.suppliersRepository.findOne<Supplier>({
      where: { id },
    });
  }

  async getSuppliersProducts(id: number): Promise<Product[]> {
    const supplier = await this.suppliersRepository.findOne<Supplier>({
      where: { id },
    });

    if (!supplier) {
      throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
    }

    return await supplier.$get('products');
  }

  async create(supplier: CreateSupplier): Promise<Supplier> {
    if (
      !supplier.name ||
      !supplier.address ||
      !supplier.phone ||
      !supplier.email
    ) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    const res = await this.suppliersRepository.create<Supplier>({
      name: supplier.name,
      address: supplier.address,
      phone: supplier.phone,
      email: supplier.email,
      userId: supplier.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    return res;
  }

  async update(id: number, supplier: Partial<Supplier>): Promise<Supplier> {
    const supplierToUpdate = await this.suppliersRepository.findOne<Supplier>({
      where: { id },
    });

    if (!supplierToUpdate) {
      throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
    }

    supplierToUpdate.update(supplier);

    return supplierToUpdate;
  }

  async delete(id: number): Promise<Supplier> {
    const supplierToDelete = await this.suppliersRepository.findOne<Supplier>({
      where: { id },
    });

    if (!supplierToDelete) {
      throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
    }

    supplierToDelete.destroy();

    return supplierToDelete;
  }
}
