import { Injectable } from '@nestjs/common';

import { ReportDatasource } from './report.datasource';
import { ReportModel } from './report.model';
import { ReportRequestDto } from './report.dto';

@Injectable()
export class ReportRepository {
  constructor(private datasource: ReportDatasource) {}

  async getReport(): Promise<ReportModel[]> {
    const entities = await this.datasource.getReport();
    
    return entities.map(entity => new ReportModel(entity));
  }

  async addReport(report: ReportRequestDto): Promise<void> {
    return await this.datasource.addReport(report);
  }
}