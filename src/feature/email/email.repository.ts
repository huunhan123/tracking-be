import { Injectable } from '@nestjs/common';

import { EmailDatasource } from './email.datasource';
import { EmailSenderModel } from './email.model';

@Injectable()
export class EmailRepository {
  constructor(private datasource: EmailDatasource) {}

  async sendEmail(productName: string): Promise<void> {
    return await this.datasource.sendEmail(productName);
  }
}