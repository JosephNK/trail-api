import { Test, TestingModule } from '@nestjs/testing';
import { TimeoutController } from './timeout.controller';

describe('TimeoutController', () => {
  let controller: TimeoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeoutController],
    }).compile();

    controller = module.get<TimeoutController>(TimeoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
