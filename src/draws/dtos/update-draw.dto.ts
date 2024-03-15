import { Type } from 'class-transformer'
import { IsDate, IsOptional, IsString } from 'class-validator'
import { User } from 'src/auth/entities/user.entity'

export class UpdateDrawDto {
  @IsString()
  @IsOptional()
  readonly name?: string

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  readonly startDate?: Date

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  readonly finalDate?: Date

  @IsString()
  @IsOptional()
  readonly winnigUserId?: string
}
