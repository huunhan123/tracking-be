import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SenderController } from './sender.controller';
import { SenderDatasource } from './sender.datasource';
import { SenderRepository } from './sender.repository';
import { EmailSender, EmailSenderSchema } from './sender.schema';
import { SharedModule } from 'src/shared/shared.module';
import { SenderView } from './sender.view';

@Module({
  controllers: [
    SenderController,
  ],
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: EmailSender.name, schema: EmailSenderSchema }]),
  ],
  providers: [
    SenderDatasource,
    SenderRepository,
    SenderView,
  ],
  exports: [
    SenderRepository,
  ],
})
export class SenderModule {}