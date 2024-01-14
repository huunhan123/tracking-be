import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { EmailSenderEntity } from './sender.entity';
import { EmailSender } from './sender.schema';
import { EmailSenderRequestModel } from './sender.model';

@Injectable()
export class SenderDatasource {

  constructor(
    @InjectModel(EmailSender.name) private emailSenderSchema: Model<EmailSender>,
  ) {}

  async getSenders(page: number, rpp: number): Promise<{data: EmailSenderEntity[], totalRows: number}> {
    const totalRows = await this.emailSenderSchema.estimatedDocumentCount();
    const data = await this.emailSenderSchema.find().skip((page - 1) * rpp).limit(rpp).exec();

    return {totalRows, data};
  }

  async addSender(senders: EmailSenderRequestModel[]): Promise<void> {
    await this.emailSenderSchema.insertMany(senders);
  }

  async getRandomSender(): Promise<EmailSenderEntity> {
    const entities = await this.emailSenderSchema.find().exec();

    return entities[Math.floor(Math.random() * entities.length)]
  }

  async deleteSender(id: string): Promise<void> {
    await this.emailSenderSchema.deleteOne({"_id": id});
  }

  async updateSender(id: string, senders: EmailSenderRequestModel): Promise<void> {
    await this.emailSenderSchema.updateOne({_id: id}, senders);
  }
}