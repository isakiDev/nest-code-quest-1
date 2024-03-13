import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { GetUser } from './decorators'
import { AuthService } from './auth.service'
// import { CreateUserDto } from './dtos'
import { User } from './entities/user.entity'

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('discord'))
  async loginDiscord (
  @GetUser() user: User
  ) {
    return await this.authService.loginDiscord(user)
  }

  // @Post()
  // async createUser (
  // @GetUser() createUserDto: CreateUserDto
  // ) {
  //   return await this.authService.create(createUserDto)
  // }
}
