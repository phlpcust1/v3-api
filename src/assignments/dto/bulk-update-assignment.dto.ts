import { IsArray, ValidateNested } from 'class-validator';
import { UpdateAssignmentDto } from './update-assignment.dto';
import { Type } from 'class-transformer';

export class BulkUpdateAssignmentDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAssignmentDto)
  assignments: UpdateAssignmentDto[];
}
