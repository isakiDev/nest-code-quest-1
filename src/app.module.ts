import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EnvConfiguration, JoiValidationSchema } from './config'

import { AuthModule } from './auth/auth.module'
import { DrawsModule } from './draws/draws.module'
import { AwardsModule } from './awards/awards.module'
import { ParticipantsModule } from './participants/participants.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true
    }),

    AuthModule,
    DrawsModule,
    AwardsModule,
    ParticipantsModule
  ]
})
export class AppModule {}
