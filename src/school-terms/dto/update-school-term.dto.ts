import { PartialType } from '@nestjs/mapped-types';
import { CreateSchoolTermDto } from './create-school-term.dto';

export class UpdateSchoolTermDto extends PartialType(CreateSchoolTermDto) {}
