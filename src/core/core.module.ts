import { Module } from '@nestjs/common';

import { MailModule } from './service/mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MailModule,
  ],
  exports: [
    MailModule,
  ],
})
export class CoreModule {}