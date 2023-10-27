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

  async getReport(queries: Queries): Promise<{ data: ReportModel[]; totalRows: number }> {
    const entities = await this.datasource.getReport();
    
    const models =  entities.map(entity => new ReportModel(entity));

    const applyQueries = this.queriesService.applyQueries(
      models,
      queries,
      (a: ReportModel, b: ReportModel): number =>
        this.compareProduct(a, b, queries.orderBy),
    );

    return applyQueries;
  }

  async addReport(report: ReportRequestDto): Promise<void> {
    return await this.datasource.addReport(report);
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