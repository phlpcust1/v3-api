import { Remark } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStudentCourseDto {
  @IsInt()
  @IsOptional()
  noTake: number;

  @IsEnum(Remark)
  @IsOptional()
  remark: Remark;

  @IsInt()
  @IsNotEmpty()
  studentId: number;

  @IsInt()
  @IsNotEmpty()
  courseId: number;

  @IsInt()
  @IsNotEmpty()
  schoolTermId: number;
}
