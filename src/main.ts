import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  // 글로벌 파이프 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 서버 타임아웃 설정 (기본값보다 길게 설정)
  // Express의 timeout 설정 (선택사항)
  app.getHttpAdapter().getInstance().timeout = 120000; // 2분

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
