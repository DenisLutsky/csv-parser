import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from '../services';
import { UserEntity } from 'src/modules/user/entities';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() body: any): Promise<UserEntity> {
    return await this.authService.register(body);
  }

  @Post('login')
  public async login(@Body() body: any): Promise<any> {
    return await this.authService.login(body);
  }
}
