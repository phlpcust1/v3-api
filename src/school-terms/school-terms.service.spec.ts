import { Test, TestingModule } from '@nestjs/testing';
import { SchoolTermsService } from './school-terms.service';

describe('SchoolTermsService', () => {
  let service: SchoolTermsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolTermsService],
    }).compile();

    service = module.get<SchoolTermsService>(SchoolTermsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
