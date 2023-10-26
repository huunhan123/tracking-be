import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';

import { SenderRepository } from './sender.repository';
import { EmailSenderRequestDto, EmailSenderResponseDto } from './sender.dto';
import { SenderView } from './sender.view';
import { ResponseModel } from 'src/shared/model/response.model';
import { Queries } from 'src/shared/service/query/query.type';

@Controller()
export class SenderController {
  constructor(
    private repository: SenderRepository,
    private view: SenderView,
  ) {}

  @Get()
  async getSenders(@Query(ValidationPipe) queries: Queries): Promise<ResponseModel<EmailSenderResponseDto[]>> {
    const data = await this.repository.getSenders(queries);

    const response = this.view.createSenders(data);
    return response;
  }

  @Post('add')
  async addSender(
    @Body() resource: EmailSenderRequestDto[],
  ): Promise<void> {
    await this.repository.addSender(resource);
  }
}