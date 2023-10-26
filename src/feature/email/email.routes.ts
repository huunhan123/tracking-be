import { RouteTree } from '@nestjs/core';

import { EmailModule } from './email.module';
import { SENDER_ROUTE } from './sender/sender.routes';
import { DESTINATION_ROUTE } from './destination/destination.routes';
import { TEMPLATE_ROUTE } from './template/template.routes';

export const EMAIL_ROUTE: RouteTree = {
  path: 'email',
  module: EmailModule,
  children: [SENDER_ROUTE, DESTINATION_ROUTE, TEMPLATE_ROUTE],
};