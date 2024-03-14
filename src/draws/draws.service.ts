import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { type CreateDrawDto } from './dtos/create-draw.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Draw } from './entities/draw.entity'
import { Repository } from 'typeorm'
// import { type UpdateDrawDto } from './dto/update-draw.dto'

@Injectable()
export class DrawsService {
  constructor (
    @InjectRepository(Draw)
    private readonly drawRepository: Repository<Draw>
  ) {}

  async create (createDrawDto: CreateDrawDto) {
    try {
      const draw = this.drawRepository.create(createDrawDto)
      await this.drawRepository.save(draw)
    } catch (error) {
      this.handleErrorException(error)
    }
  }

  // findAll () {
  //   return 'This action returns all draws'
  // }

  // findOne (id: number) {
  //   return `This action returns a #${id} draw`
  // }

  // update (id: number, updateDrawDto: UpdateDrawDto) {
  //   return `This action updates a #${id} draw`
  // }

  // remove (id: number) {
  //   return `This action removes a #${id} draw`
  // }

  private handleErrorException (error: any): never {
    if (error.code === '23505') throw new BadRequestException('Name already used')

    throw new InternalServerErrorException()
  }
}
