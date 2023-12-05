import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { EmailProxyEntity } from './proxy.entity';
import { EmailProxy } from './proxy.schema';
import { EmailProxyRequestDto } from './proxy.dto';

@Injectable()
export class ProxyDatasource {

  constructor(
    @InjectModel(EmailProxy.name) private emailProxySchema: Model<EmailProxy>,
  ) {}

  async getProxys(): Promise<EmailProxyEntity[]> {
    return await this.emailProxySchema.find().exec();
  }

  async addProxy(senders: EmailProxyRequestDto[]): Promise<void> {
    await this.emailProxySchema.insertMany(senders);
  }

  async getRandomProxy(): Promise<EmailProxyEntity> {
    const entities = await this.emailProxySchema.find().exec();

    return entities[Math.floor(Math.random() * entities.length)]
  }

  async deleteProxy(id: string): Promise<void> {
    await this.emailProxySchema.deleteOne({"_id": id});
  }
}