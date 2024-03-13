import { type ExecutionContext, createParamDecorator, InternalServerErrorException } from '@nestjs/common'

export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  const user = request.user

  if (!user) throw new InternalServerErrorException('User nor found')

  return user
})
