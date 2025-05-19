import { Test, TestingModule } from '@nestjs/testing';
import { AcadformsService } from './acadforms.service';

describe('AcadformsService', () => {
  let service: AcadformsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcadformsService],
    }).compile();

    service = module.get<AcadformsService>(AcadformsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
