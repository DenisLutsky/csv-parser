import { Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from 'src/shared/guards';
import { ReportService } from '../services';

@Controller('report')
@UseGuards(AuthGuard)
export class ReportController {
  public constructor(private readonly reportService: ReportService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public upload(@UploadedFile() file: Express.Multer.File, @Req() req: any): any {
    return this.reportService.uploadData(file, req.user.id);
  }

  @Get()
  public getReport(): string {
    return this.reportService.getReport();
  }
}
