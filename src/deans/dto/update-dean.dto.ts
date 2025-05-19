import { PartialType } from '@nestjs/mapped-types';
import { CreateDeanDto } from './create-dean.dto';

export class UpdateDeanDto extends PartialType(CreateDeanDto) {}
