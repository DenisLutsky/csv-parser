import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import ormConfig from './config/mikro-orm.config';

import { UserModule } from './modules/user/user.module';
import { ReportModule } from './modules/report/report.module';

@Module({
  imports: [MikroOrmModule.forRoot(ormConfig), UserModule, ReportModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
