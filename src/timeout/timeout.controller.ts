import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TimeoutService } from './timeout.service';

@Controller('timeout')
export class TimeoutController {
  constructor(private readonly timeoutService: TimeoutService) {}

  @Get()
  async simulateTimeout(
    @Query('delay') delay = '1000',
  ): Promise<{ message: string }> {
    try {
      const delayMs = parseInt(delay, 10);

      if (isNaN(delayMs) || delayMs < 0) {
        throw new HttpException(
          'Delay must be a positive number',
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.timeoutService.delay(delayMs);

      return {
        message: `Request processed after ${delayMs}ms delay`,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'An error occurred during timeout simulation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
