import { Body, Controller, Get, Post, Delete, Query, ValidationPipe, Param } from '@nestjs/common';

import { ProxyRepository } from './proxy.repository';
import { EmailProxyRequestDto, EmailProxyResponseDto } from './proxy.dto';
import { ProxyView } from './proxy.view';
import { ResponseModel } from 'src/shared/model/response.model';
import { Queries } from 'src/shared/service/query/query.type';

@Controller()
export class ProxyController {
  constructor(
    private repository: ProxyRepository,
    private view: ProxyView,
  ) {}

  @Get()
  async getProxys(@Query(ValidationPipe) queries: Queries): Promise<ResponseModel<EmailProxyResponseDto[]>> {
    const data = await this.repository.getProxys(queries);

    const response = this.view.createProxys(data);
    return response;
  }

  @Post('add')
  async addProxy(
    @Body() resource: EmailProxyRequestDto[],
  ): Promise<void> {
    await this.repository.addProxy(resource);
  }

  @Delete('delete/:id')
  async deleteProxy(
    @Param('id') id: string,
  ): Promise<void> {
    await this.repository.deleteProxy(id);
  }
}