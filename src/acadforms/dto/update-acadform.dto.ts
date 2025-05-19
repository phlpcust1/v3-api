import { PartialType } from '@nestjs/mapped-types';
import { CreateAcadformDto } from './create-acadform.dto';

export class UpdateAcadformDto extends PartialType(CreateAcadformDto) {}
