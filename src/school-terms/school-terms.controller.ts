import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SchoolTermsService } from './school-terms.service';
import { CreateSchoolTermDto } from './dto/create-school-term.dto';
import { UpdateSchoolTermDto } from './dto/update-school-term.dto';

@Controller('api/school-terms')
export class SchoolTermsController {
  constructor(private readonly schoolTermsService: SchoolTermsService) {}

  @Post()
  create(@Body() createSchoolTermDto: CreateSchoolTermDto) {
    return this.schoolTermsService.create(createSchoolTermDto);
  }

  @Get()
  findAll() {
    return this.schoolTermsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolTermsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSchoolTermDto: UpdateSchoolTermDto,
  ) {
    return this.schoolTermsService.update(+id, updateSchoolTermDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolTermsService.remove(+id);
  }
}
