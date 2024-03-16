import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common'

import { PaginationDto } from '../common'
import { AwardsService } from './awards.service'
import { CreateAwardDto, UpdateAwardDto } from './dtos'
import { Auth, GetUser } from '../auth/decorators'
import { ValidRoles } from 'src/auth/interfaces'
import { User } from 'src/auth/entities/user.entity'

@Controller('awards')
export class AwardsController {
  constructor (private readonly awardsService: AwardsService) {}

  @Get()
  // @Auth(ValidRoles.admin)
  async findAll (@Query() paginationDto: PaginationDto) {
    return await this.awardsService.findAll(paginationDto)
  }

  @Get(':id')
  // @Auth(ValidRoles.admin)
  async findOne (@Param('id', ParseUUIDPipe) id: string) {
    return await this.awardsService.findOne(id)
  }

  @Post()
  @Auth(ValidRoles.admin)
  async create (
  @GetUser() user: User,
    @Body() createAwardDto: CreateAwardDto
  ) {
    return await this.awardsService.create(createAwardDto, user)
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  async update (
  @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
    @Body() updateAwardDto: UpdateAwardDto
  ) {
    return await this.awardsService.update(id, updateAwardDto, user)
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  async remove (@Param('id', ParseUUIDPipe) id: string) {
    await this.awardsService.remove(id)
  }
}
