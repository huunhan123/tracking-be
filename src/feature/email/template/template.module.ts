import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TemplateController } from './template.controller';
import { TrackingModule } from '../../tracking/tracking.module';
import { TemplateDatasource } from './template.datasource';
import { TemplateRepository } from './template.repository';
import { ReportModule } from '../../report/report.module';
import { EmailTemplate, EmailTemplateSchema } from './template.shema';

@Module({
  controllers: [
    TemplateController,
  ],
  imports: [
    TrackingModule,
    ReportModule,
    MongooseModule.forFeature([{ name: EmailTemplate.name, schema: EmailTemplateSchema }]),
  ],
  providers: [
    TemplateDatasource,
    TemplateRepository,
  ],
  exports: [
    TemplateRepository,
  ],
})
export class TemplateModule {}