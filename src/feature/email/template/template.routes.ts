import { RouteTree } from '@nestjs/core';

import { TemplateModule } from './template.module';

export const TEMPLATE_ROUTE: RouteTree = {
  path: 'template',
  module: TemplateModule,
};