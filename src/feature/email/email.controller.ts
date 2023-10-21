import { Body, Controller, Get, Post } from '@nestjs/common';

import { EmailRepository } from './email.repository';
import { EmailDestinationRequestDto, EmailSenderRequestDto } from './email.dto';

@Controller()
export class EmailController {
  constructor(
    private repository: EmailRepository,
  ) {}

  @Post('send-email')
  async sendEmail(): Promise<void> {
    await this.repository.sendEmail('productA');
  }
}