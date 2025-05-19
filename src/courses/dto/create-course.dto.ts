import { YearLevel } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  units: number;

  @IsInt()
  @IsNotEmpty()
  sem: number;

  @IsEnum(YearLevel)
  @IsNotEmpty()
  year: YearLevel;

  @IsInt()
  @IsNotEmpty()
  curriculumId: number;

  @IsInt()
  @IsNotEmpty()
  programId: number;
}
