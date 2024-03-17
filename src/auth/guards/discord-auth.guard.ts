import { type ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

export class DiscordAuthGuard extends AuthGuard('discord') {
  async canActivate (context: ExecutionContext) {
    const activate = await super.canActivate(context) as boolean
    const request = context.switchToHttp().getRequest()

    await super.logIn(request)
    return activate
  }
}
