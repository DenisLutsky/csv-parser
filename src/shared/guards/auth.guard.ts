import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

import { AuthService } from 'src/modules/auth/services';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private authService: AuthService) {}

  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.auth;

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const payload = this.authService.validateToken(authHeader);
    request.user = payload;

    if (!payload) {
      return false;
    }

    return true;
  }
}
