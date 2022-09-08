import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { JwtPayload } from 'jsonwebtoken';

import { AuthGuard } from 'src/shared/guards';
import { RequestContext } from 'src/shared/interfaces';

@Controller('user')
@UseGuards(AuthGuard)
@ApiHeader({
  name: 'auth',
  description: 'Authentication JWToken',
})
export class UserController {
  @Get('/me')
  public async getMe(@Req() { user }: RequestContext): Promise<JwtPayload> {
    return user;
  }
}
