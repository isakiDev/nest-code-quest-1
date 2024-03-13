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
    const newUser = await this.create(user)
    return newUser
  }

  async create (createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto)
    const userSaved = await this.userRepository.save(user)

    return userSaved
  }
}
