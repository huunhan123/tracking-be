import { Controller, Get } from '@nestjs/common';

import { ReportRepository } from './report.repository';
import { ReportResponseDto } from './report.dto';
import { ReportView } from './report.view';

@Controller()
export class ReportController {
  constructor(
    private repository: ReportRepository,
    private view: ReportView,
  ) {}

  @Get('report')
  async getReport(): Promise<ReportResponseDto[]> {
    const model = await this.repository.getReport();
    const dto = this.view.createReport(model);

    return dto;    
  }
}