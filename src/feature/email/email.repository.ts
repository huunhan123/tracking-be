import { Injectable } from '@nestjs/common';

import { EmailDatasource } from './email.datasource';
import { Queries } from 'src/shared/service/query/query.type';

@Injectable()
export class EmailRepository {
  constructor(private datasource: EmailDatasource) {}

  async sendEmail(productName: string, queries: Queries): Promise<void> {
    return await this.datasource.sendEmail(productName, queries);
  }
}