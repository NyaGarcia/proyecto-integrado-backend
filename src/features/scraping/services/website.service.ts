import { DOMWindow, JSDOM, VirtualConsole } from 'jsdom';

import { HttpService } from './http.service';
import { Options } from '../scraping-product.interface';
import { Product } from '@features/product/product.interface';

export abstract class WebsiteService {
  constructor(protected http: HttpService) {}

  abstract async getProducts(options: Options): Promise<Product[]>;

  protected getFirstNode(window: any, selector: string): HTMLElement {
    return window.document.querySelector(selector);
  }

  protected getAllNodes(window: any, selector: string): NodeList {
    return window.document.querySelectorAll(selector);
  }

  protected async getWebWindow(link: string): Promise<DOMWindow> {
    return new Promise((resolve, reject) => {
      JSDOM.fromURL(link, {
        runScripts: 'dangerously',
        virtualConsole: new VirtualConsole(),
        pretendToBeVisual: true,
      }).then(dom => {
        setTimeout(() => {
          dom.serialize();
          resolve(dom.window);
        }, 3000);
      });
    });
  }

  protected getNodeAttribute(
    node: Element,
    attribute: string = 'textContent',
  ): string {
    if (!node) {
      return '-';
    }

    return node[attribute];
  }
}
