import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, YearLevel } from '@prisma/client';

@Injectable()
export class CoursesService {
  constructor(private db: DatabaseService) {}

  async uploadCourses(courses: CreateCourseDto[]) {
    return this.db.$transaction(async (prisma) => {
      for (const course of courses) {
        // Create the course and get its ID
        const createdCourse = await prisma.course.create({
          data: course,
        });
      }

      return { message: `${courses.length} courses uploaded successfully` };
    });
  }

  create(createCourseDto: CreateCourseDto) {
    return this.db.course.create({
      data: createCourseDto,
    });
  }

  findAll(
    filterByCurr?: number,
    filterByProgram?: number,
    filterByYear?: string,
  ) {
    const where: Prisma.CourseWhereInput = {};

    // Curr filter
    if (filterByCurr) {
      where.curriculumId = filterByCurr;
    }

    // Program filter
    if (filterByProgram) {
      where.programId = filterByProgram;
    }

    // By Year Level
    if (
      filterByYear &&
      Object.values(YearLevel).includes(filterByYear as YearLevel)
    ) {
      where.year = filterByYear as YearLevel;
    }

    return this.db.course.findMany({
      where,
      include: {
        curriculum: true,
      },
    });
  }

  findOne(id: number) {
    return this.db.course.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.db.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  remove(id: number) {
    return this.db.course.delete({ where: { id } });
  }
}
