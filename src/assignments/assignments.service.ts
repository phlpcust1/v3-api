import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(private db: DatabaseService) {}

  createMany(assignments: CreateAssignmentDto[]) {
    return this.db.assignment.createMany({
      data: assignments,
    });
  }

  async updateMany(assignments: UpdateAssignmentDto[]) {
    return this.db.$transaction(
      assignments.map((assignment) =>
        this.db.assignment.update({
          where: { studentId: assignment.studentId },
          data: { coachId: assignment.coachId },
        }),
      ),
    );
  }
}
