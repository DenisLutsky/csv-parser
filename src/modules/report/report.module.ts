import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { ReportController } from './controllers';
import { ReportService } from './services';
import { UserTransactionEntity } from './entities';

@Module({
  imports: [MikroOrmModule.forFeature([UserTransactionEntity])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
