import { Test, TestingModule } from '@nestjs/testing';
import { DeansController } from './deans.controller';
import { DeansService } from './deans.service';

describe('DeansController', () => {
  let controller: DeansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeansController],
      providers: [DeansService],
    }).compile();

    controller = module.get<DeansController>(DeansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
