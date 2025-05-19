import { PartialType } from '@nestjs/mapped-types';
import { CreateHeadDto } from './create-head.dto';

export class UpdateHeadDto extends PartialType(CreateHeadDto) {}
