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
} from '@nestjs/common';
import { DeansService } from './deans.service';
import { CreateDeanDto } from './dto/create-dean.dto';
import { UpdateDeanDto } from './dto/update-dean.dto';

@Controller('api/deans')
export class DeansController {
  constructor(private readonly deansService: DeansService) {}

  @Post()
  create(@Body() createDeanDto: CreateDeanDto) {
    return this.deansService.create(createDeanDto);
  }

  @Get()
  findAll() {
    return this.deansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeanDto: UpdateDeanDto) {
    return this.deansService.update(+id, updateDeanDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deansService.remove(+id);
  }
}
