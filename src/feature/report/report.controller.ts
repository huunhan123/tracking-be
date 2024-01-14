import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';

import { ReportRepository } from './report.repository';
import { ReportResponseDto } from './report.dto';
import { ReportView } from './report.view';
import { Queries } from 'src/shared/service/query/query.type';
import { ResponseModel } from 'src/shared/model/response.model';

@Controller()
export class ReportController {
  constructor(
    private repository: ReportRepository,
    private view: ReportView,
  ) {}

  @Get('report')
  async getReport(@Query(ValidationPipe) queries: Queries): Promise<ResponseModel<ReportResponseDto[]>> {
    const model = await this.repository.getReports(queries);
    const dto = this.view.createReport(model);

    return dto;    
  }
}