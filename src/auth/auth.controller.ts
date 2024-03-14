import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { Auth, GetUser, RoleProtected } from './decorators'
import { AuthService } from './auth.service'
// import { CreateUserDto } from './dtos'
import { User } from './entities/user.entity'
import { UserRoleGuard } from './guards/user-role.guard'
import { ValidRoles } from './interfaces'

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Get()
  @RoleProtected(ValidRoles.admin)
  @UseGuards(UserRoleGuard, AuthGuard('discord'))
  async loginDiscord (
  @GetUser() user: User
  ) {
    return await this.authService.loginDiscord(user)
  }

  @Get('test')
  @Auth(ValidRoles.admin)
  test () {

  }

  // @Post()
  // async createUser (
  // @GetUser() createUserDto: CreateUserDto
  // ) {
  //   return await this.authService.create(createUserDto)
  // }
}
