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
import { CoachesService } from './coaches.service';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import * as csv from 'csv-parser';

@Controller('api/coaches')
export class CoachesController {
  constructor(private readonly coachesService: CoachesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCoaches(@UploadedFile() file: Express.Multer.File) {
    const records: any[] = [];
    const stream = Readable.from(file.buffer.toString());

    await new Promise((resolve, reject) => {
      stream
        .pipe(csv())
        .on('data', (row) => {
          records.push(row);
        })
        .on('end', resolve)
        .on('error', reject);
    });

    return this.coachesService.uploadCoaches(records);
  }

  @Post()
  create(@Body() createCoachDto: CreateCoachDto) {
    return this.coachesService.create(createCoachDto);
  }

  @Get()
  findAll(
    @Query('q') q: string,
    @Query('filterByProgram') filterByProgram: string,
    @Query('filterBySchoolTerm') filterBySchoolTerm: string,
  ) {
    return this.coachesService.findAll(
      q,
      +filterByProgram,
      +filterBySchoolTerm,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coachesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoachDto: UpdateCoachDto) {
    return this.coachesService.update(+id, updateCoachDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coachesService.remove(+id);
  }
}
