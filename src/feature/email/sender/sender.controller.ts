import { Body, Controller, Get, Post } from '@nestjs/common';

import { SenderRepository } from './sender.repository';
import { EmailSenderRequestDto } from './sender.dto';

@Controller()
export class SenderController {
  constructor(
    private repository: SenderRepository,
  ) {}

  // @Get()
  // async getSender(): Promise<void> {
  //   await this.repository.getSender();
  // }

  @Post('add')
  async addSender(
    @Body() resource: EmailSenderRequestDto[],
  ): Promise<void> {
    await this.repository.addSender(resource);
  }
}