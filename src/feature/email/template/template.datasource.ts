import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import * as fs from 'fs';

import { EmailTemplate } from './template.shema';
import { EmailTemplateEntity } from './template.entity';
// import { EmailTemplateRequestModel } from './template.model';
import { EmailTemplateRequestDto } from './template.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TemplateDatasource {
  private readonly templateUrl: string = this.configs.get('TEMPLATE_URL');
  constructor(
    @InjectModel(EmailTemplate.name) private emailTemplateSchema: Model<EmailTemplate>,
    private configs: ConfigService,
  ) {}

  async getTemplates(): Promise<EmailTemplateEntity[]> {
    return await this.emailTemplateSchema.find().exec();
  }

  async addTemplate(template: EmailTemplateRequestDto): Promise<void> {
    const url = `${this.templateUrl}/${template.name}.ejs`

    await this.emailTemplateSchema.insertMany({name: template.name, url: url, tag: template.tag});
    fs.writeFileSync(url, template.content, 'utf-8');
    fs.writeFileSync(`dist/views/${template.name}.ejs`, template.content, 'utf-8');
  }

  async getTemplate(productName: string): Promise<EmailTemplateEntity> {
    const entities = await this.emailTemplateSchema.find().exec();
    const emailTemplate = entities.find(el => el.name.toLowerCase() === productName.toLowerCase());

    return emailTemplate as EmailTemplateEntity;
  }

  async getRandomTemplate(): Promise<EmailTemplateEntity> {
    const entities = await this.emailTemplateSchema.find().exec();

    return entities[Math.floor(Math.random() * entities.length)]
  }

  async deleteTemplate(id: string): Promise<void> {
    await this.emailTemplateSchema.deleteOne({"_id": id});
  }
}