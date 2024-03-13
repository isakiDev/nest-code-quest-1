import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { Strategy, type Profile } from 'passport-discord'

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor () {
    super({
      clientID: process.env.DC_CLIENT_ID,
      clientSecret: process.env.DC_CLIENT_SECRET,
      callbackURL: process.env.DC_CALLBACK_URL,
      scope: process.env.DC_SCOPE.split(',')
    })
  }

  // done: VerifyCallback
  async validate (accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
    const joinedToServer = profile.guilds?.some(guild => guild.id === process.env.DC_SERVER_ID)

    // TODO: update joinedToServer in users already in db
    if (!joinedToServer) throw new UnauthorizedException('User not joined to server')

    const { id, username, avatar } = profile

    const user = { id, username, avatar }

    return user
  }
}
