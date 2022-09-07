import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserEntity } from 'src/modules/user/entities';
import { UserService } from 'src/modules/user/services';
import { UserInput } from 'src/shared/interfaces';

@Injectable()
export class AuthService {
  public constructor(private readonly userService: UserService) {}

  public async register(userInput: UserInput): Promise<UserEntity> {
    const existingUser = await this.userService.findOneByEmail(userInput.email);

    if (existingUser) {
      throw new BadRequestException('User with that email has already registered');
    }

    const passwordHash = await bcrypt.hash(userInput.password, 12);

    return await this.userService.createUser({ email: userInput.email, password: passwordHash });
  }

  public async login(body: any): Promise<any> {
    return body;
  }
}
