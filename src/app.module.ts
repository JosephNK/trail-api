import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeoutController } from './timeout/timeout.controller';
import { TimeoutModule } from './timeout/timeout.module';

@Module({
  imports: [TimeoutModule],
  controllers: [AppController, TimeoutController],
  providers: [AppService],
})
export class AppModule {}
