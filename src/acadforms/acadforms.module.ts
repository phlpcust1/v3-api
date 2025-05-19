import { Module } from '@nestjs/common';
import { AcadformsService } from './acadforms.service';
import { AcadformsController } from './acadforms.controller';

@Module({
  controllers: [AcadformsController],
  providers: [AcadformsService],
})
export class AcadformsModule {}
