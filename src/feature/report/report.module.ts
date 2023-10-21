import { Module } from '@nestjs/common';

import { ReportController } from './report.controller';
import { ReportDatasource } from './report.datasource';
import { ReportRepository } from './report.repository';
import { ReportView } from './report.view';

@Module({
  controllers: [
    ReportController,
  ],
  providers: [
    ReportView,
    ReportDatasource,
    ReportRepository,
  ],
  exports: [
    ReportRepository,
  ],
})
export class ReportModule {}