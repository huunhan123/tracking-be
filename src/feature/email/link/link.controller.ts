import { Body, Controller, Get, Post, Delete, Query, ValidationPipe, Param } from '@nestjs/common';

import { LinkRepository } from './link.repository';
import { EmailLinkRequestDto, EmailLinkResponseDto } from './link.dto';
import { LinkView } from './link.view';
import { ResponseModel } from 'src/shared/model/response.model';
import { Queries } from 'src/shared/service/query/query.type';

@Controller()
export class LinkController {
  constructor(
    private repository: LinkRepository,
    private view: LinkView,
  ) {}

  @Get()
  async getLinks(@Query(ValidationPipe) queries: Queries): Promise<ResponseModel<EmailLinkResponseDto[]>> {
    const data = await this.repository.getLinks(queries);

    const response = this.view.createLinks(data);
    return response;
  }

  @Post('add')
  async addLink(
    @Body() resource: EmailLinkRequestDto[],
  ): Promise<void> {
    await this.repository.addLink(resource);
  }

  @Delete('delete/:id')
  async deleteLink(
    @Param('id') id: string,
  ): Promise<void> {
    await this.repository.deleteLink(id);
  }
}