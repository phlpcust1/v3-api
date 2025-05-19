import { Test, TestingModule } from '@nestjs/testing';
import { HeadsController } from './heads.controller';
import { HeadsService } from './heads.service';

describe('HeadsController', () => {
  let controller: HeadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeadsController],
      providers: [HeadsService],
    }).compile();

    controller = module.get<HeadsController>(HeadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
