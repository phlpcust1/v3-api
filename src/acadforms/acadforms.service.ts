import { Injectable } from '@nestjs/common';
import { CreateAcadformDto } from './dto/create-acadform.dto';
import { UpdateAcadformDto } from './dto/update-acadform.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AcadformsService {
  constructor(private db: DatabaseService) {}

  create(createAcadformDto: CreateAcadformDto) {
    return this.db.acadForm.create({
      data: createAcadformDto,
    });
  }

  findAll() {
    return this.db.acadForm.findMany();
  }

  findOne(id: number) {
    return this.db.acadForm.findUniqueOrThrow({
      where: { id },
    });
  }

  async findOneByStudentAndTerm(studentId: number, schoolTermId: number) {
    return this.db.acadForm.findFirst({
      where: {
        studentId,
        schoolTermId,
      },
    });
  }

  findOneByStudent(id: number) {
    return this.db.acadForm.findFirstOrThrow({
      where: { studentId: id },
    });
  }

  update(id: number, updateAcadformDto: UpdateAcadformDto) {
    return this.db.acadForm.update({
      where: { id },
      data: updateAcadformDto,
    });
  }

  remove(id: number) {
    return this.db.acadForm.delete({ where: { id } });
  }
}
