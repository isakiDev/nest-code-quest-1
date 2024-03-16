import { IsUUID } from 'class-validator'

export class CreateParticipantDto {
  @IsUUID()
  readonly drawId: string
}
