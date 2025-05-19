import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCurriculumDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsInt()
  @IsNotEmpty()
  rev: number;

  @IsString()
  @IsNotEmpty()
  effectivity: string;

  @IsString()
  @IsNotEmpty()
  cmoName: string;
}
