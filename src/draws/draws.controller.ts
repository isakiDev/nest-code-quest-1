import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe, Delete } from '@nestjs/common'

import { PaginationDto } from '../common'
import { DrawsService } from './draws.service'
import { Auth, GetUser } from '../auth/decorators'
import { User } from '../auth/entities/user.entity'
import { CreateDrawAwardDto, CreateDrawDto, UpdateDrawDto } from './dtos'
import { ValidRoles } from '../auth/interfaces'

@Controller('draws')
export class DrawsController {
  constructor (private readonly drawsService: DrawsService) {}

  @Get()
  async findAll (@Body() paginationDro: PaginationDto) {
    return await this.drawsService.findAll(paginationDro)
  }

  @Get(':id')
  async findOne (@Param('id', ParseUUIDPipe) id: string) {
    return await this.drawsService.findOne(id)
  }

  @Post()
  @Auth(ValidRoles.admin)
  async create (
  @GetUser() user: User,
    @Body() createDrawDto: CreateDrawDto
  ) {
    return await this.drawsService.create(createDrawDto, user)
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  async update (
  @GetUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDrawDto: UpdateDrawDto) {
    return await this.drawsService.update(id, updateDrawDto, user)
  }

  @Post('create-draw-award')
  @Auth(ValidRoles.admin)
  async createDrawAward (@Body() createDrawAwardDto: CreateDrawAwardDto) {
    return await this.drawsService.createDrawAward(createDrawAwardDto)
  }

  // TODO: think add updateDrawAward

  @Delete(':id')
  @Auth(ValidRoles.admin)
  async remove (@Param('id', ParseUUIDPipe) id: string) {
    await this.drawsService.remove(id)
  }
}
