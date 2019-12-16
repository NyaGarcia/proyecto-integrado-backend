import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Category } from '../categories/category.entity';
import { ProductDto, UpdateProductDto } from './product.interface';
import { Photo } from './entities/photo.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.query(
      `SELECT product.id, product.title, product.description, product.salePrice, product.stock, product.createdAt, category.name AS category, product.image, product.price  FROM product INNER JOIN category ON product.categoryId = category.id`,
    );
  }

  findById(id: string) {
    return this.productRepository.findOne({ id });
  }

  addImage(image: any) {
    const photo = this.productRepository.create(image);
    return this.photoRepository.save(photo);
  }

  findByCategory(category: string): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('products')
      .where(qb => {
        const subQuery = qb
          .subQuery()
          .select('category.id')
          .from(Category, 'category')
          .where('category.name = :category')
          .getQuery();
        return `products.category LIKE ${subQuery}`;
      })
      .setParameter('category', category)
      .getMany();
  }

  addProduct(productDto: ProductDto): Promise<Product> {
    const product = this.productRepository.create(productDto);
    product.createdAt = new Date();
    return this.productRepository.save(product);
  }

  deleteProduct(id: string): Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }

  updateProduct(
    id: string,
    productDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    return this.productRepository.update(id, productDto);
  }

  addMany(products: ProductDto[]) {
    console.log(products);
    return this.productRepository
      .createQueryBuilder('products')
      .insert()
      .into('product')
      .values(products)
      .execute();
  }
}
