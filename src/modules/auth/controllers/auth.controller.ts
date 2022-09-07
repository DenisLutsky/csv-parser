import { Controller, Post, Body } from '@nestjs/common';

import { UserEntity } from 'src/modules/user/entities';
import { AuthService } from '../services';
import { AuthDto } from '../dto';
import { AuthPayload } from '../interfaces';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() input: AuthDto): Promise<UserEntity> {
    return await this.authService.register(input);
  }

  @Post('login')
  public async login(@Body() input: AuthDto): Promise<AuthPayload> {
    return await this.authService.getAuthToken(input);
  }
}
