import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Draw, DrawAward } from './entities'
import { DrawsService } from './draws.service'
import { DrawsController } from './draws.controller'
import { AuthModule } from '../auth/auth.module'

@Module({
  controllers: [DrawsController],
  providers: [DrawsService],
  imports: [
    TypeOrmModule.forFeature([Draw, DrawAward]),
    AuthModule
  ]
})
export class DrawsModule {}
