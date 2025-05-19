import { Injectable } from '@nestjs/common';
import { CreateHeadDto } from './dto/create-head.dto';
import { UpdateHeadDto } from './dto/update-head.dto';
import { passwordEncryption } from 'src/utils/password-encryption.util';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class HeadsService {
  constructor(private db: DatabaseService) {}

  async create(createHeadDto: CreateHeadDto) {
    createHeadDto.password = await passwordEncryption(createHeadDto.password);

    return this.db.head.create({
      data: createHeadDto,
    });
  }

  findAll() {
    return this.db.head.findMany({
      include: {
        department: true,
      },
    });
  }

  findOne(id: number) {
    return this.db.head.findUniqueOrThrow({
      where: { id },
      include: {
        department: true,
      },
    });
  }

  findOneByUsername(username: string) {
    return this.db.head.findFirst({ where: { username } });
  }

  async update(id: number, updateHeadDto: UpdateHeadDto) {
    if (updateHeadDto.password) {
      updateHeadDto.password = await passwordEncryption(updateHeadDto.password);
    }

    return this.db.head.update({
      where: { id },
      data: updateHeadDto,
    });
  }

  remove(id: number) {
    return this.db.head.delete({
      where: { id },
    });
  }
}
