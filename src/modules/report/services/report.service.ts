import { Injectable } from '@nestjs/common';
import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportDto } from '../dto/update-report.dto';

@Injectable()
export class ReportService {
  public create(createReportDto: CreateReportDto): string {
    return 'This action adds a new report';
  }

  public findAll(): string {
    return `This action returns all report`;
  }

  public findOne(id: number): string {
    return `This action returns a #${id} report`;
  }

  public update(id: number, updateReportDto: UpdateReportDto): string {
    return `This action updates a #${id} report`;
  }

  public remove(id: number): string {
    return `This action removes a #${id} report`;
  }
}
