import { RouteTree } from '@nestjs/core';

import { SubjectModule } from './subject.module';

export const SUBJECT_ROUTE: RouteTree = {
  path: 'subject',
  module: SubjectModule,
};