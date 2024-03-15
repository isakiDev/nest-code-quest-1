import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ParticipantsService } from './participants.service'
import { ParticipantsController } from './participants.controller'
import { Participant } from './entities/participant.entity'

@Module({
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
  imports: [
    TypeOrmModule.forFeature([Participant])
  ]
})
export class ParticipantsModule {}
