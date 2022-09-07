import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/shared/guards';
import { UserEntity } from '../entities';
import { UserService } from '../services';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get(':id')
  public async findOne(@Param('id') userId: string): Promise<UserEntity> {
    return await this.userService.findOneById(+userId);
  }
}
