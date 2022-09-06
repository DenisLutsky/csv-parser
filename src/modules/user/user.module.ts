import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { UserController } from './controllers';
import { UserService } from './services';
import { UserEntity } from './entities';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
