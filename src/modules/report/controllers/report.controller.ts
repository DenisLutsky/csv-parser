import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiHeader } from '@nestjs/swagger';

import { AuthGuard } from 'src/shared/guards';
import { RequestContext } from 'src/shared/interfaces';
import { FilterDto } from '../dto';
import { UserTransactionEntity } from '../entities';
import { ReportService } from '../services';
import { Report } from '../types';

@Controller('report')
@ApiHeader({
  name: 'auth',
  description: 'Authentication JWToken',
})
@UseGuards(AuthGuard)
export class ReportController {
  public constructor(private readonly reportService: ReportService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  public upload(
    @UploadedFile() file: Express.Multer.File,
    @Req() { user }: RequestContext,
  ): Promise<UserTransactionEntity[]> {
    return this.reportService.uploadData(file, user.id);
  }

  @Post()
  public async getReport(@Body() filter: FilterDto, @Req() { user }: RequestContext): Promise<Report> {
    return await this.reportService.getReport(filter, user.id);
  }
}
