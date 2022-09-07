import { forwardRef, Module } from '@nestjs/common';

import { AuthController } from './controllers';
import { AuthService } from './services';
import { UserModule } from '../user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
