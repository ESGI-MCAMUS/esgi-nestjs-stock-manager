import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  version(): object {
    return { version: '1.0.0' };
  }
}
