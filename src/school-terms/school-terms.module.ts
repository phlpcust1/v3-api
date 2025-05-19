import { Module } from '@nestjs/common';
import { SchoolTermsService } from './school-terms.service';
import { SchoolTermsController } from './school-terms.controller';

@Module({
  controllers: [SchoolTermsController],
  providers: [SchoolTermsService],
})
export class SchoolTermsModule {}
