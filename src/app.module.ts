import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DiscordStrategy } from './auth/strategies'
import { AuthModule } from './auth/auth.module'
import { DrawsModule } from './draws/draws.module'
import { AwardsModule } from './awards/awards.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
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

    PassportModule.register({ defaultStrategy: 'discord' }),
    AuthModule,
    DrawsModule,
    AwardsModule
  ],
  providers: [DiscordStrategy]
})
export class AppModule {}
