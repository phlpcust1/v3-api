import { YearLevel } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsString()
  @IsOptional()
  contact: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsEnum(YearLevel)
  @IsOptional()
  yearLevel: YearLevel;

  @IsInt()
  @IsNotEmpty()
  programId: number;

  @IsInt()
  @IsNotEmpty()
  schoolTermId: number;
}
