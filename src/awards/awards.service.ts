import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'

import { DataSource, Repository } from 'typeorm'

import { type PaginationDto } from '../common'
import { Award, AwardImage } from './entities'
import type { UpdateAwardDto, CreateAwardDto } from './dtos'

@Injectable()
export class AwardsService {
  constructor (
    @InjectRepository(Award)
    private readonly awardRepository: Repository<Award>,
    @InjectRepository(AwardImage)
    private readonly awardImageRepository: Repository<AwardImage>,
    @InjectDataSource()
    private readonly datasource: DataSource

  ) {}

  async create (createAwardDto: CreateAwardDto /* user */) {
    const { name, images = [] } = createAwardDto

    try {
      const award = this.awardRepository.create({
        name,
        images: images.map(image => this.awardImageRepository.create({ url: image }))
      })

      await this.awardRepository.save(award)

      return award
    } catch (error) {
      this.handleErrorException(error)
    }
  }

  async findAll (paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto

    const awards = await this.awardRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true
      }
    })

    return awards
  }

  async findOne (id: string) {
    const award = await this.awardRepository.findOneBy({ id })

    if (!award) throw new NotFoundException(`Award with id ${id} not found`)

    return award
  }

  async update (id: string, updateAwardDto: UpdateAwardDto /* user */) {
    const { images, name } = updateAwardDto

    const award = await this.awardRepository.preload({ id, name })

    const queryRunner = this.datasource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      if (images) {
        await queryRunner.manager.delete(AwardImage, { award: { id } })
        award.images = images.map(image => this.awardImageRepository.create({ url: image }))
      }

      // TODO: add user
      // award.user = user

      await queryRunner.manager.save(award)
      await queryRunner.commitTransaction()
      await queryRunner.release()

      return award
    } catch (error) {
      await queryRunner.rollbackTransaction()
      await queryRunner.release()

      this.handleErrorException(error)
    }
  }

  async remove (id: string) {
    const award = await this.findOne(id)
    await this.awardRepository.remove(award)
  }

  private handleErrorException (error: any): never {
    if (error.code === '23505') throw new BadRequestException('Name already used')

    throw new InternalServerErrorException()
  }
}
