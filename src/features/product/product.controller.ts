import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ProductDto, UpdateProductDto } from './product.interface';

import { GeneralExceptionsFilter } from '@shared/general-exception.filter';
import { Product } from './entities/product.entity';
import { ProductService } from './type-product.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@shared/roles.guard';
import { AuthRoles } from 'features/auth/roles';
import { Roles } from '@shared/decorators/role.decorator';
import { ScrapingService } from '@features/scraping/services/scraping.service';
import { OptionsDto } from '@features/scraping/scraping-product.interface';
import { CategoryService } from '@features/categories/category.service';

@Controller('product')
@UseFilters(new GeneralExceptionsFilter())
@UseGuards(RolesGuard)
export class ProductController {
  constructor(
    private productService: ProductService,
    private scrapingService: ScrapingService,
    private categoryService: CategoryService,
  ) {}

  @Get()
  findAllProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':category')
  findByCategory(@Param('category') category: string): Promise<Product[]> {
    return this.productService.findByCategory(category);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Product> {
    return this.productService.findById(id);
  }

  @Post('image')
  postImage(@Body() image: any) {
    return this.productService.addImage(image);
  }

  @Post('scrape')
  async addProducts(@Body() options: OptionsDto) {
    const category = await this.categoryService.getCategoryIdByName(
      options.category,
    );

    const products = await this.scrapingService.getProducts({
      ...options,
      categoryId: category.id,
    });
    return this.productService.addMany(products);
  }

  /* @UseGuards(AuthGuard('jwt'))
  @Roles([AuthRoles.ADMIN]) */
  @Post()
  addProduct(@Body() productDto: ProductDto): Promise<Product> {
    return this.productService.addProduct(productDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles([AuthRoles.ADMIN])
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    const result = await this.productService.deleteProduct(id);

    if (!result.affected) {
      throw new HttpException(
        'Product could not be deleted',
        HttpStatus.NOT_FOUND,
      );
    }

    return id;
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles([AuthRoles.ADMIN])
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() product: UpdateProductDto,
  ): Promise<UpdateProductDto> {
    const result = await this.productService.updateProduct(id, product);

    if (!result.raw.changedRows) {
      throw new HttpException(
        'Product could not be updated',
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }
}
