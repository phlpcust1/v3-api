import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateAssignmentDto {
  @IsInt()
  @IsNotEmpty()
  studentId: number;

  @IsInt()
  @IsNotEmpty()
  coachId: number;
}
