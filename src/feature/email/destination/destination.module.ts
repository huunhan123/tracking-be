import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { DestinationController } from './destination.controller';
import { DestinationDatasource } from './destination.datasource';
import { DestinationRepository } from './destination.repository';
import { EmailDestination, EmailDestinationSchema } from './destination.schema';
import { SharedModule } from 'src/shared/shared.module';
import { DestinationView } from './destination.view';

@Module({
  controllers: [
    DestinationController,
  ],
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: EmailDestination.name, schema: EmailDestinationSchema }]),
  ],
  providers: [
    DestinationDatasource,
    DestinationRepository,
    DestinationView,
  ],
  exports: [
    DestinationDatasource,
    DestinationRepository,
  ],
})
export class DestinationModule {}