import { Category } from '@categories/category.entity';
import { CategoryModule } from '@features/categories/category.module';
import { Module } from '@nestjs/common';
import { Photo } from './entities/photo.entity';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './type-product.service';
import { ScrapingModule } from 'features/scraping/scraping.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Photo]),
    ScrapingModule,
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
