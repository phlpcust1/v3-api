import { Injectable } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProgramsService {
  constructor(private db: DatabaseService) {}

  create(createProgramDto: CreateProgramDto) {
    return this.db.program.create({ data: createProgramDto });
  }

  findAll() {
    return this.db.program.findMany({
      include: {
        department: {
          select: {
            name: true,
            code: true,
          },
        },
        coaches: true,
        students: {
          include: {
            studentCourse: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.db.program.findUniqueOrThrow({
      where: { id },
      include: {
        department: {
          select: {
            name: true,
            code: true,
          },
        },
      },
    });
  }

  update(id: number, updateProgramDto: UpdateProgramDto) {
    return this.db.program.update({ where: { id }, data: updateProgramDto });
  }

  remove(id: number) {
    return this.db.program.delete({ where: { id } });
  }
}
