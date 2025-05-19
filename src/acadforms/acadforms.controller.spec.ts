import { Test, TestingModule } from '@nestjs/testing';
import { AcadformsController } from './acadforms.controller';
import { AcadformsService } from './acadforms.service';

describe('AcadformsController', () => {
  let controller: AcadformsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcadformsController],
      providers: [AcadformsService],
    }).compile();

    controller = module.get<AcadformsController>(AcadformsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
