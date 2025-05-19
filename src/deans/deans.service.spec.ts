import { Test, TestingModule } from '@nestjs/testing';
import { DeansService } from './deans.service';

describe('DeansService', () => {
  let service: DeansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeansService],
    }).compile();

    service = module.get<DeansService>(DeansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
