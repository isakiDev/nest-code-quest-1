import { UseGuards, applyDecorators } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { RoleProtected } from './role-protected.decorator'
import { UserRoleGuard } from '../guards'
import { type ValidRoles } from '../interfaces'

export function Auth (...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard('jwt'), UserRoleGuard)
  )
}
