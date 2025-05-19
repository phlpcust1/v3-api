import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { StudentCourseService } from './student-course.service';
import { CreateStudentCourseDto } from './dto/create-student-course.dto';
import { UpdateStudentCourseDto } from './dto/update-student-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import * as csv from 'csv-parser';

@Controller('api/student-course')
export class StudentCourseController {
  constructor(private readonly studentCourseService: StudentCourseService) {}

  @Post('upload-grades')
  @UseInterceptors(FileInterceptor('file'))
  async uploadGrades(
    @UploadedFile() file: Express.Multer.File,
    @Body('studentId') studentId: string,
    @Body('schoolTermId') schoolTermId: string,
  ) {
    return this.studentCourseService.bulkUpdateGradesFromCsv(
      file.buffer,
      +studentId,
      +schoolTermId,
    );
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadStudentCourses(
    @UploadedFile() file: Express.Multer.File,
    @Body('schoolTermId') schoolTermIdRaw: string,
    @Body('studentId') studentIdRaw: string,
  ) {
    const schoolTermId = Number(schoolTermIdRaw);
    const studentId = Number(studentIdRaw);
    const rows: { subject: string }[] = [];

    const stream = Readable.from(file.buffer.toString());

    await new Promise<void>((resolve, reject) => {
      stream
        .pipe(csv())
        .on('data', (row) => rows.push({ subject: row.subject }))
        .on('end', resolve)
        .on('error', reject);
    });

    return this.studentCourseService.createFromSubjects({
      studentId,
      schoolTermId,
      subjects: rows.map((r) => r.subject),
    });
  }

  @Post()
  create(@Body() createStudentCourseDto: CreateStudentCourseDto) {
    return this.studentCourseService.create(createStudentCourseDto);
  }

  @Get()
  findAll(@Query('courseId') courseId?: string) {
    return this.studentCourseService.findAll(+courseId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentCourseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentCourseDto: UpdateStudentCourseDto,
  ) {
    return this.studentCourseService.update(+id, updateStudentCourseDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentCourseService.remove(+id);
  }
}
