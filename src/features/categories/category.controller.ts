import {
  Controller,
  UseFilters,
  Post,
  Body,
  Put,
  Get,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GeneralExceptionsFilter } from '@shared/general-exception.filter';
import { CategoryService } from './category.service';
import { CategoryDto, Category } from './category.interface';

@Controller('category')
@UseFilters(new GeneralExceptionsFilter())
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAll(): Promise<Array<Category>> {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  getById(@Param('id') id: number): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  addCategory(@Body() category: CategoryDto): Promise<Category> {
    return this.categoryService.addCategory(category);
  }

  @Put()
  async updateCategory(
    @Param('id') id: number,
    @Body() category: CategoryDto,
  ): Promise<Partial<Category>> {
    const result = await this.categoryService.updateCategory(id, category);

    if (!result.raw.changedRows) {
      throw new HttpException(
        'Category could not be updated',
        HttpStatus.NOT_FOUND,
      );
    }
    category.id = id;
    return category;
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<number> {
    const result = await this.categoryService.deleteCategory(id);

    if (!result.affected) {
      throw new HttpException(
        'Category could not be deleted',
        HttpStatus.NOT_FOUND,
      );
    }
    return id;
  }
}
