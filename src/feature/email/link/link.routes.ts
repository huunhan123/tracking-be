import { RouteTree } from '@nestjs/core';

import { LinkModule } from './link.module';

export const LINK_ROUTE: RouteTree = {
  path: 'link',
  module: LinkModule,
};