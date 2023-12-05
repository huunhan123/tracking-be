import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProxyController } from './proxy.controller';
import { ProxyDatasource } from './proxy.datasource';
import { ProxyRepository } from './proxy.repository';
import { EmailProxy, EmailProxySchema } from './proxy.schema';
import { SharedModule } from 'src/shared/shared.module';
import { ProxyView } from './proxy.view';

@Module({
  controllers: [
    ProxyController,
  ],
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: EmailProxy.name, schema: EmailProxySchema }]),
  ],
  providers: [
    ProxyDatasource,
    ProxyRepository,
    ProxyView,
  ],
  exports: [
    ProxyDatasource,
    ProxyRepository,
  ],
})
export class ProxyModule {}