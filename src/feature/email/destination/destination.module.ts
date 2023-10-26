import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DestinationController } from './destination.controller';
import { TrackingModule } from '../../tracking/tracking.module';
import { DestinationDatasource } from './destination.datasource';
import { DestinationRepository } from './destination.repository';
import { ReportModule } from '../../report/report.module';
import { EmailDestination, EmailDestinationSchema } from './destination.schema';

@Module({
  controllers: [
    DestinationController,
  ],
  imports: [
    TrackingModule,
    ReportModule,
    MongooseModule.forFeature([{ name: EmailDestination.name, schema: EmailDestinationSchema }]),
  ],
  providers: [
    DestinationDatasource,
    DestinationRepository,
  ],
  exports: [
    DestinationRepository,
  ],
})
export class DestinationModule {}