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
  Req,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import * as csvParser from 'csv-parser';
import { YearLevel } from '@prisma/client';

@Controller('api/courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCourses(
    @UploadedFile() file: Express.Multer.File,
    @Body('curriculumId') curriculumIdRaw: string,
  ) {
    const curriculumId = Number(curriculumIdRaw);
    const records: CreateCourseDto[] = [];
    const stream = Readable.from(file.buffer.toString());

    await new Promise<void>((resolve, reject) => {
      stream
        .pipe(csvParser())
        .on('data', (row) => {
          records.push({
            subject: row.subject,
            description: row.description,
            units: Number(row.units),
            sem: Number(row.sem),
            year: row.year as YearLevel, // Adjust as needed if YearLevel is an enum
            curriculumId: curriculumId,
            programId: Number(row.programId),
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    return this.coursesService.uploadCourses(records);
  }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll(
    @Query('filterByCurr') filterByCurr: string,
    @Query('filterByProgram') filterByProgram: string,
    @Query('filterByYear') filterByYear: string,
  ) {
    return this.coursesService.findAll(
      +filterByCurr,
      +filterByProgram,
      filterByYear,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
