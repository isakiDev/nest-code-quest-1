import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  readonly limit?: number

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  readonly offset?: number
}
