import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common'

import { PaginationDto } from '../common'
import { AwardsService } from './awards.service'
import { CreateAwardDto, UpdateAwardDto } from './dtos'

@Controller('awards')
export class AwardsController {
  constructor (private readonly awardsService: AwardsService) {}

  @Post()
  async create (@Body() createAwardDto: CreateAwardDto) {
    return await this.awardsService.create(createAwardDto)
  }

  @Get()
  async findAll (@Query() paginationDto: PaginationDto) {
    return await this.awardsService.findAll(paginationDto)
  }

  @Get(':id')
  async findOne (@Param('id', ParseUUIDPipe) id: string) {
    return await this.awardsService.findOne(id)
  }

  @Patch(':id')
  async update (@Param('id', ParseUUIDPipe) id: string, @Body() updateAwardDto: UpdateAwardDto) {
    return await this.awardsService.update(id, updateAwardDto)
  }

  @Delete(':id')
  async remove (@Param('id', ParseUUIDPipe) id: string) {
    await this.awardsService.remove(id)
  }
}
