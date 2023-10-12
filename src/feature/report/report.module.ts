import { Module } from '@nestjs/common';

import { ReportController } from './report.controller';
import { ReportDatasource } from './report.datasource';
import { ReportRepository } from './report.repository';

@Module({
  controllers: [
    ReportController,
  ],
  providers: [
    ReportDatasource,
    ReportRepository,
  ]
})
export class ReportModule {}