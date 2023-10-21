import { Injectable } from '@nestjs/common';

import { TemplateDatasource } from './template.datasource';
import { EmailTemplateModel } from './template.model';
import { EmailTemplateRequestDto } from './template.dto';

@Injectable()
export class TemplateRepository {
  constructor(private datasource: TemplateDatasource) {}

  async getTemplates(): Promise<EmailTemplateModel[]> {
    const entities = await this.datasource.getTemplates();
    
    return entities.map(entity => new EmailTemplateModel(entity));
  }

  async addTemplate(senders: EmailTemplateRequestDto[]): Promise<void> {
    return await this.datasource.addTemplate(senders);
  }

  async getTemplate(productName: string): Promise<EmailTemplateModel> {
    const entity = await this.datasource.getTemplate(productName);

    return entity;
  }
}