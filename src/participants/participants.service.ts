import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import type { CreateParticipantDto } from './dto'
import { Participant } from './entities/participant.entity'
import { DrawsService } from '../draws/draws.service'
import { type User } from '../auth/entities/user.entity'
import { type PaginationDto } from '../common'

@Injectable()
export class ParticipantsService {
  constructor (
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
    private readonly drawService: DrawsService
  ) {}

  async create (createParticipantDto: CreateParticipantDto, user: User) {
    const draw = await this.drawService.findOne(createParticipantDto.drawId)

    try {
      const participant = this.participantRepository.create({ draw, user })

      await this.participantRepository.save(participant)

      return participant
    } catch (error) {
      this.handleErrorException(error)
    }
  }

  async findAll (paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto

    const participants = await this.participantRepository.find({
      take: limit,
      skip: offset,
      relations: { draw: true, user: true }
    })

    return participants
  }

  async findOne (id: string) {
    const participant = await this.participantRepository.findOne({
      where: { id },
      relations: { draw: true, user: true }
    })

    if (!participant) throw new BadRequestException(`Participant with id ${id} not found`)

    return participant
  }

  // update (id: number, updateParticipantDto: UpdateParticipantDto) {
  //   return `This action updates a #${id} participant`
  // }

  async remove (id: string) {
    const participant = await this.findOne(id)
    await this.participantRepository.remove(participant)
  }

  private handleErrorException (error: any) {
    if (error.code === '22P02') throw new BadRequestException('UserId is invalid')
    if (error.code === '23505') throw new BadRequestException('User is already participating')

    throw new InternalServerErrorException()
  }
}
