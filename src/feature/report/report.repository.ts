import { Injectable } from '@nestjs/common';

import { ReportDatasource } from './report.datasource';
import { ReportModel } from './report.model';
import { ReportRequestDto } from './report.dto';
import { QueryService } from 'src/shared/service/query/query.service';
import { Queries } from 'src/shared/service/query/query.type';

@Injectable()
export class ReportRepository {
  constructor(
    private datasource: ReportDatasource,
    private queriesService: QueryService,
  ) {}

  async getReports(queries: Queries): Promise<{ data: ReportModel[]; totalRows: number }> {
    const entities = await this.datasource.getReports();
    
    const models =  entities.map(entity => new ReportModel(entity));

    const applyQueries = this.queriesService.applyQueries(
      models,
      queries,
      (a: ReportModel, b: ReportModel): number =>
        this.compareProduct(a, b, queries.orderBy),
    );

    return applyQueries;
  }

  async addReport(report: ReportRequestDto) {
    return await this.datasource.addReport(report);
  }

  async getReportById(id: string): Promise<ReportModel> {
    const entity = await this.datasource.getReportById(id);
    const model = new ReportModel(entity);

    return model;
  }

  async updateReport(id: string, updateReport: Partial<ReportRequestDto>) {
    return await this.datasource.updateReport(id, updateReport);
  }

  async deleteReportById(id: string): Promise<void> {
    await this.datasource.deleteReportById(id);
  }

  private compareProduct(
    a: ReportModel,
    b: ReportModel,
    field?: string,
  ): number {
    let first: string | number | boolean = a['id'];
    let second: string | number | boolean = b['id'];
    
    if (field) {
      first = a[field];
      second = b[field];
    }

    if (first < second) {
      return -1;
    }

    if (first > second) {
      return 1;
    }

    return 0;
  }
}