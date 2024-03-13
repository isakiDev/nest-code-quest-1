import { IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
    id: string

  @IsString()
    username: string

  @IsString()
    avatar: string
}
