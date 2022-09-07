import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from 'src/shared/guards';
import { FilterDto } from '../dto';
import { UserTransactionEntity } from '../entities';
import { ReportService } from '../services';
import { Report } from '../types';

@Controller('report')
@UseGuards(AuthGuard)
export class ReportController {
  public constructor(private readonly reportService: ReportService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public upload(@UploadedFile() file: Express.Multer.File, @Req() req: any): Promise<UserTransactionEntity[]> {
    return this.reportService.uploadData(file, req.user.id);
  }

  @Get()
  public async getReport(@Body() filter: FilterDto, @Req() req: any): Promise<Report> {
    return await this.reportService.getReport(filter, req.user.id);
  }
}
