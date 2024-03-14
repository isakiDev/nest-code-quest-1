import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { User } from './entities/user.entity'
import { type CreateUserDto } from './dtos'

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async loginDiscord (user: User) {
    const userFound = await this.findOneBy(user.id)

    if (!userFound) {
      const newUser = await this.create(user)
      return newUser
    }

    await this.userRepository.update(userFound.id, user)
    return user
  }

  async create (createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto)
    const userSaved = await this.userRepository.save(user)

    return userSaved
  }

  async findOneBy (id: string) {
    const user = await this.userRepository.findOneBy({ id })
    return user
  }
}
