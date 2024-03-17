import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import * as session from 'express-session'
import * as passport from 'passport'

import { AppModule } from './app.module'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')

  // enable session
  app.use(session({
    secret: 'dawdadawdada',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 900000
    }
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  app.enableCors({
    origin: ['http://localhost:5173']
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  await app.listen(process.env.PORT)
}
bootstrap()
