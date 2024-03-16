import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { AuthService } from './auth.service'
// import { CreateUserDto } from './dtos'
import { User } from './entities/user.entity'
import { GetUser } from './decorators'
import { CreateUserDto } from './dtos'

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

  @Get('discord/register')
  @UseGuards(AuthGuard('discord'))
  async createUserDiscord (
  @GetUser() createUserDto: CreateUserDto
  ) {
    return await this.authService.create(createUserDto)
  }
}
