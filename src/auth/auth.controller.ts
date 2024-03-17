import { Controller, Get, Query, UseGuards } from '@nestjs/common'

import { AuthService } from './auth.service'
import { User } from './entities/user.entity'
import { Auth, GetUser } from './decorators'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Get('discord')
  @UseGuards(AuthGuard('discord'))
  async showLoginDiscord (
  ) {}

  @Get('discord/callback')
  async getAccessToken (
  @Query('code') code: string
  ) {
    return await this.authService.getAccessToken(code)
  }

  @Get('discord/me')
  async loginWithDiscord (
  @Query('accessToken') accessToken: string
  ) {
    return await this.authService.loginDiscord(accessToken)
  }

  @Get('check-auth-status')
  @Auth()
  checkAuthStatus (
  @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus(user)
  }
}
