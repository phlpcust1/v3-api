import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DepartmentsService {
  constructor(private db: DatabaseService) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    return this.db.department.create({ data: createDepartmentDto });
  }

  findAll() {
    return this.db.department.findMany();
  }

  findOne(id: number) {
    return this.db.department.findUniqueOrThrow({ where: { id } });
  }

  findOneById(id: number) {
    return this.db.department.findFirst({ where: { id } });
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return this.db.department.update({
      where: { id },
      data: updateDepartmentDto,
    });
  }

  remove(id: number) {
    return this.db.department.delete({ where: { id } });
  }
}
