import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { UserInput } from 'src/shared/interfaces';
import { UserEntity } from '../entities';
import { Nullable } from 'src/shared/types';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
  ) {}

  public async createUser(userInput: UserInput): Promise<UserEntity> {
    const user = this.userRepository.create(userInput);

    await this.userRepository.persistAndFlush(user);

    return user;
  }

  public async findOneById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ userId });

    if (!user) throw new NotFoundException(`User with id:${userId} was not found`);

    return user;
  }

  public async findOneByEmail(email: string): Promise<Nullable<UserEntity>> {
    const user = await this.userRepository.findOne({ email });

    return user;
  }
}
