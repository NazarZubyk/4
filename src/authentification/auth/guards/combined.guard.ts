import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';

@Injectable()
export class CombinedGuard implements CanActivate {
  constructor(private readonly authGuard: AuthGuard, private readonly rolesGuard: RolesGuard) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Perform logic from AuthGuard
    const canActivateAuth = await this.authGuard.canActivate(context);

    // Perform logic from RolesGuard
    const canActivateRoles = await this.rolesGuard.canActivate(context);

    // Combine the results and return
    return canActivateAuth && canActivateRoles;
  }
}