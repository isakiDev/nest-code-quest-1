import { IsArray, IsOptional, IsString } from 'class-validator'

export class CreateAwardDto {
  @IsString()
  readonly name: string

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  readonly images?: string[]
}
