import { Injectable } from '@nestjs/common';

import { EmailDatasource } from './email.datasource';
import { EmailRequestDto } from './email.dto';

@Injectable()
export class EmailRepository {
  constructor(private datasource: EmailDatasource) {}

  async sendEmail(resource: EmailRequestDto): Promise<void> {
    const { templateName, subject } = resource;
    return await this.datasource.sendEmail(templateName, subject);
  }
}