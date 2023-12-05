import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LinkController } from './link.controller';
import { LinkDatasource } from './link.datasource';
import { LinkRepository } from './link.repository';
import { EmailLink, EmailLinkSchema } from './link.schema';
import { SharedModule } from 'src/shared/shared.module';
import { LinkView } from './link.view';

@Module({
  controllers: [
    LinkController,
  ],
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: EmailLink.name, schema: EmailLinkSchema }]),
  ],
  providers: [
    LinkDatasource,
    LinkRepository,
    LinkView,
  ],
  exports: [
    LinkDatasource,
    LinkRepository,
  ],
})
export class LinkModule {}