import { Injectable } from '@nestjs/common';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { DatabaseService } from 'src/database/database.service';
import { passwordEncryption } from 'src/utils/password-encryption.util';
import { Prisma } from '@prisma/client';

@Injectable()
export class CoachesService {
  constructor(private db: DatabaseService) {}

  async uploadCoaches(coaches: CreateCoachDto[]) {
    for (const coach of coaches) {
      coach.programId = Number(coach.programId);
      coach.schoolTermId = Number(coach.schoolTermId);
      coach.password = await passwordEncryption(coach.password); // This will now properly await
    }

    return this.db.coach.createMany({
      data: coaches,
    });
  }

  async create(createCoachDto: CreateCoachDto) {
    createCoachDto.password = await passwordEncryption(createCoachDto.password);

    return this.db.coach.create({
      data: createCoachDto,
    });
  }

  findAll(q?: string, filterByProgram?: number, filterBySchoolTerm?: number) {
    const where: Prisma.CoachWhereInput = {};

    // Search query filter
    if (q) {
      where.OR = [
        {
          firstName: { contains: q, mode: 'insensitive' },
        },
        {
          lastName: { contains: q, mode: 'insensitive' },
        },
        {
          coachId: { contains: q, mode: 'insensitive' },
        },
      ];
    }

    // Program filter
    if (filterByProgram) {
      where.programId = filterByProgram;
    }

    if (filterBySchoolTerm) {
      where.schoolTermId = filterBySchoolTerm;
    }

    return this.db.coach.findMany({
      where,
      include: {
        program: true,
        assignments: {
          include: {
            student: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.db.coach.findUniqueOrThrow({
      where: { id },
      include: {
        program: true,
        assignments: {
          include: {
            student: {
              include: {
                schoolTerm: true,
                studentCourse: {
                  include: {
                    course: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  findOneByUsername(username: string) {
    return this.db.coach.findFirst({ where: { username } });
  }

  async update(id: number, updateCoachDto: UpdateCoachDto) {
    if (updateCoachDto.password) {
      updateCoachDto.password = await passwordEncryption(
        updateCoachDto.password,
      );
    }

    return this.db.coach.update({
      where: { id },
      data: updateCoachDto,
    });
  }

  remove(id: number) {
    return this.db.coach.delete({
      where: { id },
    });
  }
}
