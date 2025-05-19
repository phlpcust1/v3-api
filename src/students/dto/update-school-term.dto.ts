import { IsArray, IsInt } from 'class-validator';

export class UpdateSchoolTermDto {
  @IsArray()
  userIds: number[];

  @IsInt()
  schoolTermId: number;
}
