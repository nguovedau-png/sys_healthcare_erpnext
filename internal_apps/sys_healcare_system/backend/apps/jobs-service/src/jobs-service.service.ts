import { Injectable } from '@nestjs/common';

@Injectable()
export class JobsServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
