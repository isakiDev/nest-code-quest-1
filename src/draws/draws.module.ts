import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Draw } from './entities/draw.entity'
import { DrawsService } from './draws.service'
import { DrawsController } from './draws.controller'

@Module({
  controllers: [DrawsController],
  providers: [DrawsService],
  imports: [
    TypeOrmModule.forFeature([Draw])
  ]
})
export class DrawsModule {}
