import { Injectable } from '@nestjs/common';

import { EmailDatasource } from './email.datasource';
import { EmailDestinationRequestDto, EmailSenderRequestDto } from './email.dto';

@Injectable()
export class EmailRepository {
  constructor(private datasource: EmailDatasource) {}

  async sendEmail(productName: string): Promise<void> {
    return await this.datasource.sendEmail(productName);
  }

  async addSender(senders: EmailSenderRequestDto[]): Promise<void> {
    return await this.datasource.addSender(senders);
  }

  async addDestination(destinations: EmailDestinationRequestDto[]): Promise<void> {
    return await this.datasource.addDestination(destinations);
  }
}