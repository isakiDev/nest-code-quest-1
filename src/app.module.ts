import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { AuthModule } from './auth/auth.module'
import { DiscordStrategy } from './common'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'discord' }),
    AuthModule
  ],
  providers: [DiscordStrategy]
})
export class AppModule {}
