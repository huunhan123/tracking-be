import { RouteTree } from '@nestjs/core';

import { ProxyModule } from './proxy.module';

export const PROXY_ROUTE: RouteTree = {
  path: 'proxy',
  module: ProxyModule,
};