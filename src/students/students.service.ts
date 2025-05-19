import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DatabaseService } from 'src/database/database.service';
import { passwordEncryption } from 'src/utils/password-encryption.util';
import { Prisma, YearLevel } from '@prisma/client';
import { UpdateSchoolTermDto } from './dto/update-school-term.dto';

@Injectable()
export class StudentsService {
  constructor(private db: DatabaseService) {}

  async uploadStudents(students: CreateStudentDto[]) {
    return this.db.$transaction(async (prisma) => {
      for (const student of students) {
        // Ensure programId is a number and encrypt the password
        student.programId = Number(student.programId);
        student.password = await passwordEncryption(student.password);

        student.schoolTermId = Number(student.schoolTermId);

        // Create the student and retrieve their ID
        const createdStudent = await prisma.student.create({
          data: student,
        });

        // Fetch all courses belonging to the student's program
        // const courses = await prisma.course.findMany({
        //   where: { programId: createdStudent.programId },
        // });

        // Create StudentCourse records for the student with these courses
        // const studentCoursePromises = courses.map((course) =>
        //   prisma.studentCourse.create({
        //     data: {
        //       studentId: createdStudent.id,
        //       courseId: course.id,
        //     },
        //   }),
        // );

        // await Promise.all(studentCoursePromises);
      }

      return { message: `${students.length} students uploaded successfully` };
    });
  }

  async create(createStudentDto: CreateStudentDto) {
    createStudentDto.password = await passwordEncryption(
      createStudentDto.password,
    );

    return this.db.student.create({
      data: createStudentDto,
    });
  }

  findAll(
    q?: string,
    filterByYearLevel?: string,
    filterByProgram?: number,
    filterBySchoolTerm?: number,
  ) {
    const where: Prisma.StudentWhereInput = {};

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
          studentId: { contains: q, mode: 'insensitive' },
        },
      ];
    }

    // Year level filter
    if (
      filterByYearLevel &&
      Object.values(YearLevel).includes(filterByYearLevel as YearLevel)
    ) {
      where.yearLevel = filterByYearLevel as YearLevel;
    }

    // Program filter
    if (filterByProgram) {
      where.programId = filterByProgram;
    }

    if (filterBySchoolTerm) {
      where.schoolTermId = filterBySchoolTerm;
    }

    return this.db.student.findMany({
      where,
      include: {
        program: true,
        assignment: {
          include: {
            coach: true,
          },
        },
        studentCourse: {
          include: {
            course: {
              include: {
                curriculum: true,
              },
            },
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.db.student.findUniqueOrThrow({
      where: { id },
      include: {
        program: true,
        assignment: {
          include: {
            coach: true,
          },
        },
        studentCourse: {
          include: {
            course: true,
          },
        },
      },
    });
  }

  findOneByUsername(username: string) {
    return this.db.student.findFirst({ where: { username } });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    if (updateStudentDto.password) {
      updateStudentDto.password = await passwordEncryption(
        updateStudentDto.password,
      );
    }

    return this.db.student.update({
      where: { id },
      data: updateStudentDto,
    });
  }

  remove(id: number) {
    return this.db.student.delete({
      where: { id },
    });
  }

  async removeMany(ids: number[]) {
    return this.db.student.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }

  async updateStudentsSchoolTerm(students: UpdateSchoolTermDto) {
    return this.db.student.updateMany({
      where: {
        id: {
          in: students.userIds,
        },
      },
      data: {
        schoolTermId: students.schoolTermId,
      },
    });
  }
}
