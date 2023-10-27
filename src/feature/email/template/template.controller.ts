import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';

import { TemplateRepository } from './template.repository';
import { EmailTemplateRequestDto } from './template.dto';
import { ResponseModel } from 'src/shared/model/response.model';
import { TemplateView } from './template.view';
import { Queries } from 'src/shared/service/query/query.type';

@Controller()
export class TemplateController {
  constructor(
    private repository: TemplateRepository,
    private view: TemplateView,
  ) {}

  @Get()
  async getTemplates(@Query(ValidationPipe) queries: Queries): Promise<ResponseModel<EmailTemplateRequestDto[]>> {
    const data = await this.repository.getTemplates(queries);

    const response = this.view.createTemplates(data);
    
    return response;
  }

  @Post('add')
  async addTemplate(
    @Body() resource: EmailTemplateRequestDto[],
  ): Promise<void> {
    await this.repository.addTemplate(resource);
  }
  
}