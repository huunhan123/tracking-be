import { RouteTree } from '@nestjs/core';

import { SenderModule } from './sender.module';

export const SENDER_ROUTE: RouteTree = {
  path: 'sender',
  module: SenderModule,
};