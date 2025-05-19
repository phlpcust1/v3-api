import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCoachDto {
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
  coachId: string;

  @IsString()
  @IsOptional()
  contact: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsInt()
  @IsNotEmpty()
  programId: number;

  @IsInt()
  @IsNotEmpty()
  schoolTermId: number;
}
