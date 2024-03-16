import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { AuthService } from './auth.service'
import { User } from './entities/user.entity'
import { GetUser } from './decorators'

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Get('discord')
  @UseGuards(AuthGuard('discord'))
  async loginDiscord (
  @GetUser() user: User
  ) {
    return await this.authService.login(user)
  }
}
