import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 서버 타임아웃 설정 (기본값보다 길게 설정)
  // Express의 timeout 설정 (선택사항)
  app.getHttpAdapter().getInstance().timeout = 120000; // 2분

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
