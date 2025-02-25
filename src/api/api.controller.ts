import {
  Controller,
  Get,
  Query,
  Param,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('timeout')
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

      await this.apiService.delay(delayMs);

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

  @Get('notfound')
  simulateNotFound(@Query('force') force = 'false'): { message: string } {
    const shouldForce = force === 'true';

    if (shouldForce) {
      throw new NotFoundException('Resource not found');
    }

    return {
      message:
        'This endpoint can return 404. Use ?force=true to trigger a 404 response',
    };
  }

  @Get('resources/:id')
  getResource(@Param('id') id: string): { id: string; message: string } {
    // 존재하지 않는 리소스 시뮬레이션 (예시로 ID가 '999'인 경우 404 반환)
    if (id === '999') {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }

    return {
      id,
      message: `Resource ${id} found successfully`,
    };
  }
}
