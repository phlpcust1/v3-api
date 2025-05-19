import { Module } from '@nestjs/common';
import { DeansService } from './deans.service';
import { DeansController } from './deans.controller';

@Module({
  controllers: [DeansController],
  providers: [DeansService],
  exports: [DeansService],
})
export class DeansModule {}
