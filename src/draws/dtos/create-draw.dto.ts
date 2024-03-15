import { Type } from 'class-transformer'
import { IsDate, IsString } from 'class-validator'

export class CreateDrawDto {
  @IsString()
  readonly name: string

  @IsDate()
  @Type(() => Date)
  readonly startDate: Date

  @IsDate()
  @Type(() => Date)
  readonly finalDate: Date
}
