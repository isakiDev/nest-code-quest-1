import { Inject, Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { AuthService } from '../auth.service'
import { type User } from '../entities/user.entity'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor (
    @Inject(AuthService)
    private readonly authService: AuthService
  ) {
    super()
  }

  // eslint-disable-next-line "@typescript-eslint/ban-types"
  serializeUser (user: User, done: Function) {
    done(null, user)
  }

  // eslint-disable-next-line "@typescript-eslint/ban-types"
  async deserializeUser (payload: { email: string }, done: Function) {
    const user = await this.authService.findOne(payload.email)

    return user
      ? done(null, {
        ...user,
        token: this.authService.getJwt({ id: user.id })
      })
      : done(null, null)
  }
}
