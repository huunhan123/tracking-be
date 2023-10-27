import { Controller, Post, Query, ValidationPipe } from '@nestjs/common';

import { EmailRepository } from './email.repository';
import { Queries } from 'src/shared/service/query/query.type';

@Controller()
export class EmailController {
  constructor(
    private repository: EmailRepository,
  ) {}

  @Post('send-email')
  async sendEmail(@Query(ValidationPipe) queries: Queries): Promise<void> {
    await this.repository.sendEmail('productA', queries);
  }
}