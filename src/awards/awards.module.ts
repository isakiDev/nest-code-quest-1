import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Award, AwardImage } from './entities'
import { AwardsService } from './awards.service'
import { AwardsController } from './awards.controller'

@Module({
  controllers: [AwardsController],
  providers: [AwardsService],
  imports: [
    TypeOrmModule.forFeature([Award, AwardImage])
  ],
  exports: [AwardsService]
})
export class AwardsModule {}
