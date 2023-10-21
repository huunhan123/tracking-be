import { Injectable } from '@nestjs/common';

import { SenderDatasource } from './sender.datasource';
import { EmailSenderRequestDto } from './sender.dto';
import { EmailSenderModel } from '../email.model';

@Injectable()
export class SenderRepository {
  constructor(private datasource: SenderDatasource) {}

  async getSenders(): Promise<EmailSenderModel[]> {
    const entities = await this.datasource.getSenders();
    return entities.map(entity => new EmailSenderModel(entity));
  }

  async addSender(senders: EmailSenderRequestDto[]): Promise<void> {
    return await this.datasource.addSender(senders);
  }

  async getRandomSender(): Promise<EmailSenderModel> {
    const entity = await this.datasource.getRandomSender();
    
    return entity;
  }
}