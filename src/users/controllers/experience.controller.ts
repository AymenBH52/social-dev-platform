import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ExperienceService } from '../services/experience.service';
import { CreateExperienceDto } from '../dto/create-experience.dto';
import { UpdateExperienceDto } from '../dto/update-experience.dto';
import { Experience } from '../entities/experience.entity';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly expService: ExperienceService) {}

  @Post()
  async create(
    @Body() createExperienceDto: CreateExperienceDto,
  ): Promise<Experience> {
    return this.expService.create(createExperienceDto);
  }

  @Get()
  async findAll(): Promise<Experience[]> {
    return this.expService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Experience> {
    return this.expService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ): Promise<Experience> {
    return this.expService.update(id, updateExperienceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.expService.remove(id);
  }
}
