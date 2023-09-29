import { Module } from '@nestjs/common';

import { EmailController } from './email.controller';
import { TrackingModule } from '../tracking/tracking.module';
import { EmailDatasource } from './email.datasource';
import { EmailRepository } from './email.repository';

@Module({
  controllers: [
    EmailController,
  ],
  imports: [
    TrackingModule,
  ],
  providers: [
    EmailDatasource,
    EmailRepository,
  ]
})
export class EmailModule {}