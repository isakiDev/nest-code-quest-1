import { UnauthorizedException } from '@nestjs/common'
import { type ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from '../entities/user.entity'

import { type JwtPayload } from '../interfaces'

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
    // configService: ConfigService
  ) {
    super({
      // TODO: add config service
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate ({ id }: JwtPayload) {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) throw new UnauthorizedException('Token not valid')
    if (!user.isActive) throw new UnauthorizedException('User is inactive')

    return user
  }
}
