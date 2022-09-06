import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/shared/guards';
import { ReportService } from '../services';
import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportDto } from '../dto/update-report.dto';

@Controller('report')
@UseGuards(AuthGuard)
export class ReportController {
  public constructor(private readonly reportService: ReportService) {}

  @Post()
  public create(@Body() createReportDto: CreateReportDto): string {
    return this.reportService.create(createReportDto);
  }

  @Get()
  public findAll(): string {
    return this.reportService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): string {
    return this.reportService.findOne(+id);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto): string {
    return this.reportService.update(+id, updateReportDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): string {
    return this.reportService.remove(+id);
  }
}
