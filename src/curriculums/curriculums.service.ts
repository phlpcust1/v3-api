import { Injectable } from '@nestjs/common';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CurriculumsService {
  constructor(private db: DatabaseService) {}

  create(createCurriculumDto: CreateCurriculumDto) {
    return this.db.curriculum.create({
      data: createCurriculumDto,
    });
  }

  findAll() {
    return this.db.curriculum.findMany();
  }

  findOne(id: number) {
    return this.db.curriculum.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateCurriculumDto: UpdateCurriculumDto) {
    return this.db.curriculum.update({
      where: { id },
      data: updateCurriculumDto,
    });
  }

  remove(id: number) {
    return this.db.curriculum.delete({
      where: { id },
    });
  }
}
