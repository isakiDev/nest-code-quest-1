import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-discord'

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor () {
    super({
      clientID: '1216779662492041277',
      clientSecret: 'RB_fIyTyIFvO1ukZEP2pw3et7Nx3eUZM',
      callbackURL: 'http://localhost:3000/api/auth',
      scope: ['identify', 'guilds']
    })
  }

  async validate (accessToken: string, refreshToken: string, profile: any /* done: VerifyCallback */): Promise<any> {
    console.log({ accessToken, refreshToken, profile })
    return profile
  }
}
