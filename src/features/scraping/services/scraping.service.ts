import {
  BASE_URL,
  OH_POLLY_SELECTORS,
} from '@shared/constants/oh-polly.constants';

import { HttpService } from './http.service';
import { Injectable } from '@nestjs/common';
import { Options } from '../scraping-product.interface';
import { Product } from '@features/product/product.interface';
import { WebsiteService } from './website.service';

@Injectable()
export class ScrapingService extends WebsiteService {
  constructor(http: HttpService) {
    super(http);
  }

  public async getProducts(options: Options): Promise<Product[]> {
    const productNodes = await this.getProductNodes(
      `${BASE_URL}${options.categoryUrl}`,
    );
    const products = await this.getFullProducts(productNodes, options);
    return products.filter(Boolean);
  }

  private async getProductNodes(webUrl: string) {
    const window = await this.getWebWindow(webUrl);
    return this.getAllNodes(window, OH_POLLY_SELECTORS.PRODUCTS);
  }

  private async getFullProducts(
    products: NodeList,
    options: Options,
  ): Promise<Product[]> {
    return Promise.all(
      Array.from(products).map(product =>
        this.getFullProduct(product, options),
      ),
    ).then(products => {
      console.log(products);
      return products;
    });
  }

  private async getFullProduct(
    productElement,
    { categoryId }: Options,
  ): Promise<Product> {
    try {
      const price = parseFloat(
        productElement
          .querySelector(OH_POLLY_SELECTORS.PRICE)
          .textContent.replace('€', '')
          .trim(),
      );
      const imageUrl = productElement.querySelector(
        OH_POLLY_SELECTORS.IMAGE_URL,
      )['href'];
      const image = await this.getImage(imageUrl);

      const product: Product = {
        title: productElement.querySelector(OH_POLLY_SELECTORS.TITLE)
          .textContent,
        description: productElement.querySelector(
          OH_POLLY_SELECTORS.DESCRIPTION,
        ).textContent,
        image,
        category: categoryId,
        price,
        salePrice: 0,
        stock: Math.floor(Math.random() * 100),
      };

      return product;
    } catch (e) {
      console.log(e);
    }
  }

  private async getImage(url: string) {
    const window = await this.getWebWindow(url);
    const image = this.getFirstNode(window, OH_POLLY_SELECTORS.IMAGE)['src'];
    return image;
  }

  private clearDuplicatedProducts(products: Product[]): Product[] {
    return products.filter(
      (product, index) =>
        index ===
        products.findIndex(
          ({ title, image, description }) =>
            title === product.title &&
            product.image === image &&
            product.description === description,
        ),
    );
  }
}
