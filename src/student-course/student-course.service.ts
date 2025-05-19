import { Injectable } from '@nestjs/common';
import { CreateStudentCourseDto } from './dto/create-student-course.dto';
import { UpdateStudentCourseDto } from './dto/update-student-course.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, Remark } from '@prisma/client';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';

@Injectable()
export class StudentCourseService {
  constructor(private db: DatabaseService) {}

  async bulkUpdateGradesFromCsv(
    buffer: Buffer,
    studentId: number,
    schoolTermId: number,
  ) {
    const stream = Readable.from(buffer.toString());
    const updates: { subject: string; remark: string }[] = [];

    await new Promise<void>((resolve, reject) => {
      stream
        .pipe(csvParser())
        .on('data', (row) => {
          const subject = row.subject?.trim();
          const remark = row.remark?.trim().toUpperCase();

          if (!subject || !remark) return;

          // Ensure remark is a valid enum
          if (!Object.values(Remark).includes(remark as Remark)) {
            throw new Error(`Invalid remark value: ${remark}`);
          }

          updates.push({ subject, remark });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    const studentCourses = await this.db.studentCourse.findMany({
      where: {
        studentId,
        schoolTermId,
      },
      include: {
        course: true,
      },
    });

    const updatePromises = [];

    for (const row of updates) {
      const matched = studentCourses.find(
        (sc) => sc.course.subject.toLowerCase() === row.subject.toLowerCase(),
      );

      if (matched) {
        updatePromises.push(
          this.db.studentCourse.update({
            where: { id: matched.id },
            data: {
              remark: row.remark as Remark,
            },
          }),
        );
      }
    }

    await this.db.$transaction(updatePromises);

    return { message: `${updatePromises.length} grades updated.` };
  }

  async createFromSubjects(params: {
    studentId: number;
    schoolTermId: number;
    subjects: string[];
  }) {
    const { studentId, schoolTermId, subjects } = params;
    const created = [];

    for (const subject of subjects) {
      const course = await this.db.course.findFirst({
        where: { subject: subject.trim() },
      });

      if (!course) {
        // Optionally skip or throw
        console.warn(`Course not found: ${subject}`);
        continue;
      }

      const exists = await this.db.studentCourse.findFirst({
        where: {
          studentId,
          courseId: course.id,
          schoolTermId,
        },
      });

      if (!exists) {
        const record = await this.db.studentCourse.create({
          data: {
            studentId,
            courseId: course.id,
            schoolTermId,
            // noTake and remark will default automatically
          },
        });

        created.push(record);
      }
    }

    return {
      message: `${created.length} student subjects uploaded successfully.`,
      data: created,
    };
  }

  create(createStudentCourseDto: CreateStudentCourseDto) {
    return this.db.studentCourse.create({
      data: createStudentCourseDto,
    });
  }

  findAll(courseId?: number) {
    let where: Prisma.StudentCourseWhereInput = {};

    if (courseId) {
      where = {
        courseId,
      };
    }

    return this.db.studentCourse.findMany({
      where,
      include: {
        course: true,
        student: {
          include: {
            program: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.db.studentCourse.findUniqueOrThrow({
      where: { id },
      include: {
        course: true,
      },
    });
  }

  update(id: number, updateStudentCourseDto: UpdateStudentCourseDto) {
    return this.db.studentCourse.update({
      where: { id },
      data: updateStudentCourseDto,
    });
  }

  remove(id: number) {
    return this.db.studentCourse.delete({ where: { id } });
  }
}
