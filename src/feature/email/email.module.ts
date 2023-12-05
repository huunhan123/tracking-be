import { Module } from '@nestjs/common';

import { EmailController } from './email.controller';
import { TrackingModule } from '../tracking/tracking.module';
import { EmailDatasource } from './email.datasource';
import { EmailRepository } from './email.repository';
import { ReportModule } from '../report/report.module';
import { TemplateModule } from './template/template.module';
import { DestinationModule } from './destination/destination.module';
import { SenderModule } from './sender/sender.module';
import { SubjectModule } from './subject/subject.module';
import { LinkModule } from './link/link.module';

@Module({
  controllers: [
    EmailController,
  ],
  imports: [
    TrackingModule,
    ReportModule,
    TemplateModule,
    SenderModule,
    DestinationModule,
    SubjectModule,
    LinkModule,
  ],
  providers: [
    EmailDatasource,
    EmailRepository,
  ]
})
export class EmailModule {}