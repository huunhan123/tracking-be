import { Module } from '@nestjs/common';

import { ReportController } from './report.controller';
import { ReportDatasource } from './report.datasource';
import { ReportRepository } from './report.repository';
import { ReportView } from './report.view';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportTemplate, ReportTemplateSchema } from './report.shema';

@Module({
  controllers: [
    ReportController,
  ],
  providers: [
    ReportView,
    ReportDatasource,
    ReportRepository,
  ],
  imports: [
    MongooseModule.forFeature([{ name: ReportTemplate.name, schema: ReportTemplateSchema }]),
  ],
  exports: [
    ReportRepository,
  ],
})
export class ReportModule {}