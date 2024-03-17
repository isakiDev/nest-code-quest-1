import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'

import { Repository } from 'typeorm'

import { User } from './entities/user.entity'
import { type CreateUserDto } from './dtos'
import { type JwtPayload } from './interfaces'

interface GuildsResponse {
  id: string
  name: string
  icon: string
  owner: boolean
  permissions: number
  permissions_new: string
  features: any[]
}

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async login (user: User) {
    const userFound = await this.findOne(user.email)
      .catch(error => {})

    if (!userFound) {
      const newUser = await this.create(user)

      await this.userRepository.save(newUser)

      return {
        ...newUser,
        token: this.getJwt({ id: newUser.id })
      }
    }

    return {
      ...userFound,
      token: this.getJwt({ id: userFound.id })
    }
  }

  async create (createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto)

      await this.userRepository.save(user)

      return {
        ...user,
        token: this.getJwt({ id: user.id })
      }
    } catch (error) {
      this.handleErrorException(error)
    }
  }

  async findOne (email: string) {
    const user = await this.userRepository.findOneBy({ email })
    if (!user) throw new NotFoundException(`User with email ${email} not found`)
    return user
  }

  getJwt (payload: JwtPayload) {
    const token = this.jwtService.sign(payload)
    return token
  }

  checkAuthStatus (user: User) {
    const { createdAt, isActive, joinedToServer, updatedAt, ...data } = user

    return {
      user: data,
      token: this.getJwt({ id: user.id })
    }
  }

  async loginDiscord (accessToken: string) {
    const user = await this.getProfile(accessToken)
    const guilds = await this.getGuilds(accessToken)

    const joinedToServer = guilds.map(guild => guild.id === process.env.DC_SERVER_ID)
    if (!joinedToServer) throw new UnauthorizedException('User not joined to server')

    return await this.login(user)
  }

  async getProfile (accessToken: string) {
    const response = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (!response.ok) throw new InternalServerErrorException('Error getting profile')

    const userData = await response.json() as User
    return userData
  }

  async getGuilds (accessToken: string) {
    const response = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (!response.ok) throw new InternalServerErrorException('Error get guilds')

    return await response.json() as GuildsResponse[]
  }

  async getAccessToken (code: string) {
    try {
      const response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          client_id: process.env.DC_CLIENT_ID,
          client_secret: process.env.DC_CLIENT_SECRET,
          grant_type: 'authorization_code',
          code,
          redirect_uri: process.env.DC_CALLBACK_URL,
          scope: process.env.DC_SCOPE
        })
      })

      if (!response.ok) throw new InternalServerErrorException('Error getting token')

      const responseData = await response.json()

      const { access_token, token_type, expires_in } = responseData

      return { access_token, token_type, expires_in }
    } catch (error) {
      this.handleErrorException(error)
    }
  }

  private handleErrorException (error: any): never {
    if (error.code === '23505') throw new BadRequestException('Email already used')

    throw new InternalServerErrorException()
  }
}
