import { UseGuards, applyDecorators } from '@nestjs/common';

import { Roles } from './role.decorator';

/* export function Auth(...roles: Role[]) {
  return applyDecorators(Roles(roles), UseGuards(AuthGuard, RolesGuard));
}
 */
