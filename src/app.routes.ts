import { Routes } from '@nestjs/core';

import { EMAIL_ROUTE } from './feature/email/email.routes';

export const APP_ROUTES: Routes = [
  EMAIL_ROUTE,
];