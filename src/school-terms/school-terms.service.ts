import { Injectable } from '@nestjs/common';
import { CreateSchoolTermDto } from './dto/create-school-term.dto';
import { UpdateSchoolTermDto } from './dto/update-school-term.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SchoolTermsService {
  constructor(private db: DatabaseService) {}

  create(createSchoolTermDto: CreateSchoolTermDto) {
    return 'This action adds a new schoolTerm';
  }

  findAll() {
    return this.db.schoolTerm.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} schoolTerm`;
  }

  update(id: number, updateSchoolTermDto: UpdateSchoolTermDto) {
    return `This action updates a #${id} schoolTerm`;
  }

  remove(id: number) {
    return `This action removes a #${id} schoolTerm`;
  }
}
