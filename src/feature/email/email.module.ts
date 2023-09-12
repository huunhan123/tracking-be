import { Module } from '@nestjs/common';

import { EmailController } from './email.controller';
import { MailModule } from 'src/core/service/mail/mail.module';
import { TrackingModule } from '../tracking/tracking.module';
import { TrackingController } from '../tracking/tracking.controller';

@Module({
  controllers: [
    EmailController,
  ],
  imports: [
    MailModule,
    TrackingModule,
  ],
  providers: [
    TrackingController,
  ]
})
export class EmailModule {}