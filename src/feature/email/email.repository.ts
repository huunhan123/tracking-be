import { Injectable } from '@nestjs/common';

import { EmailDatasource } from './email.datasource';

@Injectable()
export class EmailRepository {
  constructor(private datasource: EmailDatasource) {}

  async sendEmail(productName: string): Promise<void> {
    return await this.datasource.sendEmail(productName);
  }
}