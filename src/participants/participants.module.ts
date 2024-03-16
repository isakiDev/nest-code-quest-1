import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ParticipantsService } from './participants.service'
import { ParticipantsController } from './participants.controller'
import { Participant } from './entities/participant.entity'
import { DrawsModule } from '../draws/draws.module'

@Module({
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
  imports: [
    TypeOrmModule.forFeature([Participant]),
    DrawsModule
  ]
})
export class ParticipantsModule {}
