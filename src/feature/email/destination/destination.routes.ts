import { RouteTree } from '@nestjs/core';

import { DestinationModule } from './destination.module';

export const DESTINATION_ROUTE: RouteTree = {
  path: 'destination',
  module: DestinationModule,
};