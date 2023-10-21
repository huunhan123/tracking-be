import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SenderController } from './sender.controller';
import { TrackingModule } from '../../tracking/tracking.module';
import { SenderDatasource } from './sender.datasource';
import { SenderRepository } from './sender.repository';
import { EmailSender, EmailSenderSchema } from './sender.schema';
import { ReportModule } from '../../report/report.module';

@Module({
  controllers: [
    SenderController,
  ],
  imports: [
    TrackingModule,
    ReportModule,
    MongooseModule.forFeature([{ name: EmailSender.name, schema: EmailSenderSchema }]),
  ],
  providers: [
    SenderDatasource,
    SenderRepository,
  ]
})
export class SenderModule {}