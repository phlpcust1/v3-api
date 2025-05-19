import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HeadsService } from './heads.service';
import { CreateHeadDto } from './dto/create-head.dto';
import { UpdateHeadDto } from './dto/update-head.dto';

@Controller('api/heads')
export class HeadsController {
  constructor(private readonly headsService: HeadsService) {}

  @Post()
  create(@Body() createHeadDto: CreateHeadDto) {
    return this.headsService.create(createHeadDto);
  }

  @Get()
  findAll() {
    return this.headsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.headsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeadDto: UpdateHeadDto) {
    return this.headsService.update(+id, updateHeadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.headsService.remove(+id);
  }
}
