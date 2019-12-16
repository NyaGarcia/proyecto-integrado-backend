import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { Repository, DeleteResult } from 'typeorm';
import { CategoryDto, UpdateCategoryDto } from './category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  getCategories(): Promise<Array<Category>> {
    return this.categoryRepository.find();
  }

  getCategoryById(id: number): Promise<Category> {
    return this.categoryRepository.findOne({ id });
  }

  getCategoryIdByName(name: string): Promise<any> {
    return this.categoryRepository
      .createQueryBuilder('category')
      .where('category.name = :name', { name })
      .select(['category.id'])
      .getOne();
  }

  addCategory(categoryDto: CategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(categoryDto);
    return this.categoryRepository.save(category);
  }

  deleteCategory(id: number): Promise<DeleteResult> {
    return this.categoryRepository.delete(id);
  }

  updateCategory(id: number, category: UpdateCategoryDto) {
    return this.categoryRepository.update(id, category);
  }
}
