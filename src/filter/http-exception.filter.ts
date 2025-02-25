import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    const errorMessage =
      typeof errorResponse === 'object' && 'message' in errorResponse
        ? errorResponse['message']
        : exception.message;

    const errorLog = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      errorName: exception.name,
      message: errorMessage,
    };

    // 404 오류만 디버그 레벨로 로깅, 나머지는 에러 레벨로 로깅
    if (status === HttpStatus.NOT_FOUND) {
      this.logger.debug(
        `404 Not Found: ${request.method} ${request.url}`,
        errorLog,
      );
    } else {
      this.logger.error(`Exception: ${exception.message}`, errorLog);
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: errorMessage,
    });
  }
}
