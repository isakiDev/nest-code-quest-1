import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe } from '@nestjs/common'

import { PaginationDto } from '../common'
import { ParticipantsService } from './participants.service'
import { CreateParticipantDto } from './dto/create-participant.dto'
import { Auth, GetUser } from '../auth/decorators'
import { User } from '../auth/entities/user.entity'
import { ValidRoles } from 'src/auth/interfaces'

@Controller('participants')
export class ParticipantsController {
  constructor (
    private readonly participantsService: ParticipantsService
  ) {}

  // TODO: think add Auth()
  @Get()
  async findAll (@Body() paginationDto: PaginationDto) {
    return await this.participantsService.findAll(paginationDto)
  }

  @Get(':id')
  async findOne (@Param('id', ParseUUIDPipe) id: string) {
    return await this.participantsService.findOne(id)
  }

  @Post()
  @Auth()
  async create (
  @GetUser() user: User,
    @Body() createParticipantDto: CreateParticipantDto
  ) {
    return await this.participantsService.create(createParticipantDto, user)
  }

  // @Patch(':id')
  // update (@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto) {
  //   return this.participantsService.update(+id, updateParticipantDto)
  // }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  async remove (@Param('id', ParseUUIDPipe) id: string) {
    await this.participantsService.remove(id)
  }
}
