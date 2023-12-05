import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { EmailLinkEntity } from './link.entity';
import { EmailLink } from './link.schema';
import { EmailLinkRequestDto } from './link.dto';

@Injectable()
export class LinkDatasource {

  constructor(
    @InjectModel(EmailLink.name) private emailLinkSchema: Model<EmailLink>,
  ) {}

  async getLinks(): Promise<EmailLinkEntity[]> {
    return await this.emailLinkSchema.find().exec();
  }

  async addLink(senders: EmailLinkRequestDto[]): Promise<void> {
    await this.emailLinkSchema.insertMany(senders);
  }

  async getRandomLink(): Promise<EmailLinkEntity> {
    const entities = await this.emailLinkSchema.find().exec();

    return entities[Math.floor(Math.random() * entities.length)]
  }

  async deleteLink(id: string): Promise<void> {
    await this.emailLinkSchema.deleteOne({"_id": id});
  }
}