import { RouteTree } from '@nestjs/core';

import { EmailModule } from './email.module';

export const EMAIL_ROUTE: RouteTree = {
  path: 'email',
  module: EmailModule,
};