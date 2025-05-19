import { Test, TestingModule } from '@nestjs/testing';
import { HeadsService } from './heads.service';

describe('HeadsService', () => {
  let service: HeadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeadsService],
    }).compile();

    service = module.get<HeadsService>(HeadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
