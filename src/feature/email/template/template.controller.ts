import { Body, Controller, Get, Post } from '@nestjs/common';

import { TemplateRepository } from './template.repository';
import { EmailTemplateRequestDto } from './template.dto';

@Controller()
export class TemplateController {
  constructor(
    private repository: TemplateRepository,
  ) {}

  // @Get()
  // async getTemplate(): Promise<void> {
  //   await this.repository.getTemplate();
  // }

  @Post('add')
  async addTemplate(
    @Body() resource: EmailTemplateRequestDto[],
  ): Promise<void> {
    await this.repository.addTemplate(resource);
  }
  
}