import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
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

  async login (user: User) {
    await this.findOne(user.email)
    // await this.userRepository.update(userFound.id, user)
    return {
      ...user,
      token: this.getJwt({ id: user.id })
    }
  }

  async create (createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto)

      console.log(user)

      await this.userRepository.save(user)

      return {
        ...user,
        token: this.getJwt({ id: user.id })
      }
    } catch (error) {
      console.log(error)
      this.handleErrorException(error)
    }
  }

  async findOne (email: string) {
    const user = await this.userRepository.findOneBy({ email })
    if (!user) throw new NotFoundException(`User with email ${email} not found`)
    return user
  }

  private getJwt (payload: JwtPayload) {
    const token = this.jwtService.sign(payload)
    return token
  }

  private handleErrorException (error: any): never {
    if (error.code === '23505') throw new BadRequestException('Email already used')

    throw new InternalServerErrorException()
  }
}
