import { Semester } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateSchoolTermDto {
  @IsString()
  @IsNotEmpty()
  sy: string;

  @IsEnum(Semester)
  @IsNotEmpty()
  semester: Semester;
}
