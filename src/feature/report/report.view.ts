import { Injectable } from '@nestjs/common';

import { ReportModel } from './report.model';
import { ReportResponseDto } from './report.dto';
import { ResponseModel } from 'src/shared/model/response.model';

@Injectable()
export class ReportView {
  createReport(data: {
    data: ReportModel[];
    totalRows: number;
  }): ResponseModel<ReportResponseDto[]> {
    
    return {
      data: data.data,
      metadata: {
        totalRows: data.totalRows,
      }
    };
  }
}