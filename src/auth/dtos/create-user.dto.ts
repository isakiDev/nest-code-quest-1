import { IsEmail, IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  readonly oAuthId: string

  @IsEmail()
  readonly email: string

  @IsString()
  readonly username: string

  @IsString()
  readonly avatar?: string
}
