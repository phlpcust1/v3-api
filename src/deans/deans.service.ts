import { Injectable } from '@nestjs/common';
import { CreateDeanDto } from './dto/create-dean.dto';
import { UpdateDeanDto } from './dto/update-dean.dto';
import { DatabaseService } from 'src/database/database.service';
import { passwordEncryption } from 'src/utils/password-encryption.util';

@Injectable()
export class DeansService {
  constructor(private db: DatabaseService) {}

  async create(createDeanDto: CreateDeanDto) {
    createDeanDto.password = await passwordEncryption(createDeanDto.password);

    return this.db.dean.create({
      data: createDeanDto,
    });
  }

  findAll() {
    return this.db.dean.findMany({
      include: {
        department: true,
      },
    });
  }

  findOne(id: number) {
    return this.db.dean.findUniqueOrThrow({
      where: { id },
      include: {
        department: true,
      },
    });
  }

  findOneByUsername(username: string) {
    return this.db.dean.findFirst({ where: { username } });
  }

  async update(id: number, updateDeanDto: UpdateDeanDto) {
    if (updateDeanDto.password) {
      updateDeanDto.password = await passwordEncryption(updateDeanDto.password);
    }

    return this.db.dean.update({
      where: { id },
      data: updateDeanDto,
    });
  }

  remove(id: number) {
    return this.db.dean.delete({
      where: { id },
    });
  }
}
