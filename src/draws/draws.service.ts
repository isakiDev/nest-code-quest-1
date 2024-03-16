import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { type User } from '../auth/entities/user.entity'
import { Draw } from './entities/draw.entity'
import type { CreateDrawAwardDto, CreateDrawDto, UpdateDrawDto } from './dtos'
import { AuthService } from 'src/auth/auth.service'
import { type PaginationDto } from 'src/common'
import { AwardsService } from 'src/awards/awards.service'
import { DrawAward } from './entities'

@Injectable()
export class DrawsService {
  constructor (
    @InjectRepository(Draw)
    private readonly drawRepository: Repository<Draw>,
    @InjectRepository(DrawAward)
    private readonly drawAwardRepository: Repository<DrawAward>,
    private readonly authService: AuthService,
    private readonly awardService: AwardsService
  ) {}

  async create (createDrawDto: CreateDrawDto, user: User) {
    try {
      const draw = this.drawRepository.create({
        ...createDrawDto,
        user
      })

      await this.drawRepository.save(draw)

      return draw
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async update (id: string, updateDrawDto: UpdateDrawDto, user: User) {
    await this.findOne(id)

    const winningUserId = updateDrawDto.winnigUserId

    const draw = await this.drawRepository.preload({
      id,
      ...updateDrawDto,
      user
    })

    if (winningUserId) {
      const user = await this.authService.findOne(winningUserId)
      draw.winningUser = user
    }

    await this.drawRepository.save(draw)

    return draw
  }

  async findAll (paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto

    const draws = this.drawRepository.find({
      take: limit,
      skip: offset,
      relations: { winningUser: true, user: true }
    })

    return await draws
  }

  async findOne (id: string) {
    const draw = await this.drawRepository.findOne({
      where: { id },
      relations: { winningUser: true, user: true }
    })

    if (!draw) throw new NotFoundException(`Draw with id ${id} not found`)

    return draw
  }

  async createDrawAward (createDrawAwardDto: CreateDrawAwardDto) {
    const { drawId, awardId } = createDrawAwardDto

    const award = await this.awardService.findOne(awardId)
    const draw = await this.findOne(drawId)

    const drawAward = this.drawAwardRepository.create({ award, draw })
    return await this.drawAwardRepository.save(drawAward)
  }

  // TODO: add remove
  // remove (id: number) {
  //   return `This action removes a #${id} draw`
  // }
}
