import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { type User } from '../auth/entities/user.entity'
import { Draw } from './entities/draw.entity'
import type { CreateDrawDto, UpdateDrawDto } from './dtos'
import { AuthService } from 'src/auth/auth.service'
import { type PaginationDto } from 'src/common'

@Injectable()
export class DrawsService {
  constructor (
    @InjectRepository(Draw)
    private readonly drawRepository: Repository<Draw>,
    private readonly authService: AuthService
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
      const user = await this.authService.findOneBy(winningUserId)
      if (!user) throw new NotFoundException(`User with id ${id} not found`)
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

  // TODO: add remove
  // remove (id: number) {
  //   return `This action removes a #${id} draw`
  // }
}
