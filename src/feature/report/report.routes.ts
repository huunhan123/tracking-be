import { RouteTree } from '@nestjs/core';

import { ReportModule } from './report.module';

export const REPORT_ROUTE: RouteTree = {
  path: 'report',
  module: ReportModule,
};