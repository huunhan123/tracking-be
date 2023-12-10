import { Body, Controller, Post } from '@nestjs/common';

import { EmailRepository } from './email.repository';
import { EmailRequestDto } from './email.dto';

@Controller()
export class EmailController {
  constructor(
    private repository: EmailRepository,
  ) {}

  @Post('send-email')
  async sendEmails(@Body() resource: EmailRequestDto): Promise<void> {
    await this.repository.sendEmails();
  }
}