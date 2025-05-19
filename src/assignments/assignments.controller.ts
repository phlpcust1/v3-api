import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { BulkCreateAssignmentDto } from './dto/bulk-create-assignment.dto';
import { BulkUpdateAssignmentDto } from './dto/bulk-update-assignment.dto';

@Controller('api/assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post('bulk')
  createMany(@Body() bulkCreateAssignmentDto: BulkCreateAssignmentDto) {
    return this.assignmentsService.createMany(
      bulkCreateAssignmentDto.assignments,
    );
  }

  @Patch('bulk')
  updateMany(@Body() bulkUpdateAssignmentDto: BulkUpdateAssignmentDto) {
    return this.assignmentsService.updateMany(
      bulkUpdateAssignmentDto.assignments,
    );
  }
}
