import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import ormConfig from './configs/mikro-orm.config';

import { UserModule } from './modules/user/user.module';
import { ReportModule } from './modules/report/report.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [MikroOrmModule.forRoot(ormConfig), UserModule, ReportModule, AuthModule],
})
export class AppModule {}
