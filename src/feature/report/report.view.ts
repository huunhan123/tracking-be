import { Injectable } from '@nestjs/common';

import { ReportModel } from './report.model';
import { ReportResponseDto } from './report.dto';

@Injectable()
export class ReportView {
  createReport(data: ReportModel[]): ReportResponseDto[] {
    return data;
  }
}