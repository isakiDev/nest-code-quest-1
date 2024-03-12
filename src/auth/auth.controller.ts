import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('discord'))
  async discordLogin () {
    return { msg: 'hello' }
  }
}
