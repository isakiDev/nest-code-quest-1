import { IsUUID } from 'class-validator'

export class CreateDrawAwardDto {
  @IsUUID()
  readonly drawId: string

  @IsUUID()
  readonly awardId: string
}
