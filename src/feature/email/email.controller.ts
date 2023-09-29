import { Controller, Get, Post } from '@nestjs/common';

import { EmailRepository } from './email.repository';

@Controller()
export class EmailController {
  constructor(
    private repository: EmailRepository,
  ) {}

  @Get('send-email')
  async sendEmail() {
    await this.repository.sendEmail('productA');
  }
}