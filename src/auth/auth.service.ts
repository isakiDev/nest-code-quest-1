import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { User } from './entities/user.entity'
import { type CreateUserDto } from './dtos'
import { JwtService } from '@nestjs/jwt'
import { type JwtPayload } from './interfaces'

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async loginDiscord (user: User) {
    const userFound = await this.findOne(user.id)

    if (!userFound) {
      const newUser = await this.create(user)

      return {
        ...newUser,
        token: this.getJwt({ id: newUser.id })
      }
    }

    await this.userRepository.update(userFound.id, user)

    return {
      ...user,
      token: this.getJwt({ id: user.id })
    }
  }

  async create (createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto)
    const userSaved = await this.userRepository.save(user)

    return userSaved
  }

  async findOne (id: string) {
    const user = await this.userRepository.findOneBy({ id })
    return user
  }

  private getJwt (payload: JwtPayload) {
    const token = this.jwtService.sign(payload)
    return token
  }
}
