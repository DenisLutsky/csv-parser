import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { config } from 'configs/app.config';

import { UserEntity } from 'src/modules/user/entities';
import { UserService } from 'src/modules/user/services';
import { AuthInput } from 'src/shared/interfaces';
import { AuthPayload } from '../interfaces';

@Injectable()
export class AuthService {
  public constructor(private readonly userService: UserService) {}

  public async register(userInput: AuthInput): Promise<UserEntity> {
    const existingUser = await this.userService.findOneByEmail(userInput.email);

    if (existingUser) {
      throw new BadRequestException('User with that email has already registered');
    }

    const passwordHash = await bcrypt.hash(userInput.password, 12);

    return await this.userService.createUser({ email: userInput.email, password: passwordHash });
  }

  public async getAuthToken(loginCredentials: AuthInput): Promise<AuthPayload> {
    const existingUser = await this.userService.findOneByEmail(loginCredentials.email);

    if (!existingUser) {
      throw new BadRequestException('User with that email is not registered yet');
    }

    const passwordsMatch = await bcrypt.compare(loginCredentials.password, existingUser.password);

    if (!passwordsMatch) {
      throw new UnauthorizedException('Wrong password');
    }

    const token = jwt.sign(
      {
        id: existingUser.userId,
        email: existingUser.email,
      },
      config.app.secret,
      {
        expiresIn: '7d',
      },
    );

    if (!token) {
      console.error('Token was not created');
      throw new InternalServerErrorException();
    }

    return { auth: token };
  }

  public validateToken(authToken: string): jwt.JwtPayload {
    return jwt.verify(authToken, config.app.secret) as jwt.JwtPayload;
  }
}
