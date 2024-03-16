import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'

import { Strategy, type Profile } from 'passport-discord'

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor (
    configService: ConfigService
  ) {
    super({
      clientID: configService.get('DC_CLIENT_ID'),
      clientSecret: configService.get('DC_CLIENT_SECRET'),
      callbackURL: configService.get('DC_CALLBACK_URL'),
      scope: configService.get('DC_SCOPE').split(',')
    })
  }

  // done: VerifyCallback
  async validate (accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
    const joinedToServer = profile.guilds?.some(guild => guild.id === process.env.DC_SERVER_ID)

    if (!joinedToServer) throw new UnauthorizedException('User not joined to server')

    const { id, username, avatar, email } = profile

    return { oAuthId: id, username, avatar, email }
  }
}
