import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/shared/guards';
import { UserService } from '../services';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Post()
  public create(@Body() createUserDto: CreateUserDto): string {
    return this.userService.create(createUserDto);
  }

  @Get()
  public findAll(): string {
    return this.userService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): string {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): string {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): string {
    return this.userService.remove(+id);
  }
}
