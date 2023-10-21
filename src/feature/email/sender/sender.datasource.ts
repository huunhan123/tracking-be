import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { EmailSenderEntity } from './sender.entity';
import { EmailSender } from './sender.schema';
import { EmailSenderRequestDto } from './sender.dto';

@Injectable()
export class SenderDatasource {

  constructor(
    @InjectModel(EmailSender.name) private emailSenderSchema: Model<EmailSender>,
  ) {}

  async getSenders(): Promise<EmailSenderEntity[]> {
    return await this.emailSenderSchema.find().exec();
  }

  async addSender(senders: EmailSenderRequestDto[]): Promise<void> {
    await this.emailSenderSchema.insertMany(senders);
  }

  async getRandomSender(): Promise<EmailSenderEntity> {
    const entities = await this.emailSenderSchema.find().exec();

    return entities[Math.floor(Math.random() * entities.length)]
  }
}