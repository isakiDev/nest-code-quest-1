import { Controller, Get, NotFoundException, Redirect, Req, UseGuards } from '@nestjs/common'

import { AuthService } from './auth.service'
import { User } from './entities/user.entity'
import { Auth, GetUser } from './decorators'
import { DiscordAuthGuard } from './guards/discord-auth.guard'

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Get('discord')
  @Redirect('http://localhost:5173', 301)
  @UseGuards(DiscordAuthGuard)
  async loginDiscord (
  @GetUser() user: User
  ) {
    return await this.authService.login(user)
      .catch(() => { return { url: 'http://localhost:5173/error', statusCode: 302 } })
  }

  @Get('status')
  getStatus (
  @Req() req: Express.Request
  ) {
    if (!req.user) throw new NotFoundException('User not authenticated')

    return {
      user: req.user
    }
  }

  @Get('check-auth-status')
  @Auth()
  checkAuthStatus (
  @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus(user)
  }
}
