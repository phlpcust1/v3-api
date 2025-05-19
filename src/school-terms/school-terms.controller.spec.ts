import { Test, TestingModule } from '@nestjs/testing';
import { SchoolTermsController } from './school-terms.controller';
import { SchoolTermsService } from './school-terms.service';

describe('SchoolTermsController', () => {
  let controller: SchoolTermsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolTermsController],
      providers: [SchoolTermsService],
    }).compile();

    controller = module.get<SchoolTermsController>(SchoolTermsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
