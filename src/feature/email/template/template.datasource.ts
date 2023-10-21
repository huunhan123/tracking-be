import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { EmailTemplate } from './template.shema';
import { EmailTemplateRequestDto } from './template.dto';
import { EmailTemplateEntity } from './template.entity';

@Injectable()
export class TemplateDatasource {
  constructor(
    @InjectModel(EmailTemplate.name) private emailTemplateSchema: Model<EmailTemplate>
  ) {}

  async getTemplates(): Promise<EmailTemplateEntity[]> {
    return await this.emailTemplateSchema.find().exec();
  }

  async addTemplate(templates: EmailTemplateRequestDto[]): Promise<void> {
    await this.emailTemplateSchema.insertMany(templates);
  }

  async getTemplate(productName: string): Promise<EmailTemplateEntity> {
    const entities = await this.emailTemplateSchema.find().exec();
    const emailTemplate = entities.find(el => el.name.toLowerCase() === productName.toLowerCase());

    return emailTemplate as EmailTemplateEntity;
  }
}