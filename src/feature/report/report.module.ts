import { Module } from '@nestjs/common';

import { ReportController } from './report.controller';
import { ReportDatasource } from './report.datasource';
import { ReportRepository } from './report.repository';
import { ReportView } from './report.view';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportTemplate, ReportTemplateSchema } from './report.shema';
import { SharedModule } from 'src/shared/shared.module';

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
    SharedModule,
    MongooseModule.forFeature([{ name: ReportTemplate.name, schema: ReportTemplateSchema }]),
  ],
  exports: [
    ReportRepository,
    ReportDatasource,
  ],
})
export class ReportModule {}