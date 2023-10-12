import { Injectable } from '@nestjs/common';

import { ReportEntity } from './report.entity';
import { ReportRequestDto } from './report.dto';

@Injectable()
export class ReportDatasource {
  constructor() {}

  async getReport(): Promise<ReportEntity[]> {
    //TODO: Get from database
    return [];
  }

  async addReport(report: ReportRequestDto): Promise<void> {
    //TODO: write to database
  }
}