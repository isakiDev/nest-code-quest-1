import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe } from '@nestjs/common'

import { PaginationDto } from '../common'
import { DrawsService } from './draws.service'
import { Auth, GetUser } from '../auth/decorators'
import { User } from '../auth/entities/user.entity'
import { CreateDrawDto, UpdateDrawDto } from './dtos'
import { ValidRoles } from '../auth/interfaces'

@Controller('draws')
export class DrawsController {
  constructor (private readonly drawsService: DrawsService) {}

  @Post()
  @Auth(ValidRoles.admin)
  async create (
  @GetUser() user: User,
    @Body() createDrawDto: CreateDrawDto
  ) {
    return await this.drawsService.create(createDrawDto, user)
  }

  @Get()
  async findAll (@Body() paginationDro: PaginationDto) {
    return await this.drawsService.findAll(paginationDro)
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  async update (
  @GetUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDrawDto: UpdateDrawDto) {
    return await this.drawsService.update(id, updateDrawDto, user)
  }

  @Get(':id')
  async findOne (@Param('id', ParseUUIDPipe) id: string) {
    return await this.drawsService.findOne(id)
  }

  // @Delete(':id')
  // remove (@Param('id') id: string) {
  //   return this.drawsService.remove(+id)
  // }
}
