import { Module } from '@nestjs/common';
import { TimeoutService } from './timeout.service';
import { TimeoutController } from './timeout.controller';

@Module({
  controllers: [TimeoutController],
  providers: [TimeoutService],
  exports: [TimeoutService],
})
export class TimeoutModule {}
