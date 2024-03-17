import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { User } from './entities/user.entity'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { DiscordStrategy, JwtStrategy } from './strategies'

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, DiscordStrategy],
  imports: [
    ConfigModule,

    TypeOrmModule.forFeature([User]),

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '1h'
          }
        }
      }
    })
  ],
  exports: [
    AuthService
  ]
})
export class AuthModule {}
