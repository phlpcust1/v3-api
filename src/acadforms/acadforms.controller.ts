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
} from '@nestjs/common';
import { AcadformsService } from './acadforms.service';
import { CreateAcadformDto } from './dto/create-acadform.dto';
import { UpdateAcadformDto } from './dto/update-acadform.dto';

@Controller('api/acadforms')
export class AcadformsController {
  constructor(private readonly acadformsService: AcadformsService) {}

  @Post()
  create(@Body() createAcadformDto: CreateAcadformDto) {
    return this.acadformsService.create(createAcadformDto);
  }

  @Get()
  findAll() {
    return this.acadformsService.findAll();
  }

  @Get('student/:id')
  findOneByStudent(
    @Param('id') id: string,
    @Query('schoolTermId') schoolTermId?: string,
  ) {
    // If `schoolTermId` is provided, use the service method with both filters
    if (schoolTermId) {
      return this.acadformsService.findOneByStudentAndTerm(+id, +schoolTermId);
    }
    // Else fallback to the original by-student lookup
    return this.acadformsService.findOneByStudent(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.acadformsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAcadformDto: UpdateAcadformDto,
  ) {
    return this.acadformsService.update(+id, updateAcadformDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.acadformsService.remove(+id);
  }
}
