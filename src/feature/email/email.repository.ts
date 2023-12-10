import { Injectable } from '@nestjs/common';

import { EmailDatasource } from './email.datasource';

@Injectable()
export class EmailRepository {
  constructor(private datasource: EmailDatasource) {}

  async sendEmails(): Promise<void> {
    return await this.datasource.sendEmails();
  }
}