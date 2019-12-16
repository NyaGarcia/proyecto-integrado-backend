import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class HttpService {
  get(url: string): Promise<any> {
    return fetch(url);
  }
}
