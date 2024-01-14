import { Module } from '@nestjs/common';

import { TrackingController } from './tracking.controller';
import { ReportModule } from '../report/report.module';

@Module({
  controllers: [
    TrackingController,
  ],
  imports: [
    ReportModule,
  ]
})
export class TrackingModule {}