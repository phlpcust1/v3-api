import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  @IsNotEmpty()
  uniqueId: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  departmentId: number;
}
