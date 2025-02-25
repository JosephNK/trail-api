import { Injectable } from '@nestjs/common';

@Injectable()
export class TimeoutService {
  async delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }
}
