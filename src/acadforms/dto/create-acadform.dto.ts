import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAcadformDto {
  @IsString()
  @IsNotEmpty()
  recommendation: string;

  @IsOptional()
  subjectPlan?: any;

  @IsInt()
  @IsNotEmpty()
  studentId: number;

  @IsInt()
  @IsNotEmpty()
  schoolTermId: number;
}
