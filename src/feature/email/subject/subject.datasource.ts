import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { EmailSubjectEntity } from './subject.entity';
import { EmailSubject } from './subject.schema';
import { EmailSubjectRequestDto } from './subject.dto';

@Injectable()
export class SubjectDatasource {

  constructor(
    @InjectModel(EmailSubject.name) private emailSubjectSchema: Model<EmailSubject>,
  ) {}

  async getSubjects(): Promise<EmailSubjectEntity[]> {
    return await this.emailSubjectSchema.find().exec();
  }

  async addSubject(senders: EmailSubjectRequestDto[]): Promise<void> {
    await this.emailSubjectSchema.insertMany(senders);
  }

  async getRandomSubject(): Promise<EmailSubjectEntity> {
    const entities = await this.emailSubjectSchema.find().exec();

    return entities[Math.floor(Math.random() * entities.length)]
  }

  async deleteSubject(id: string): Promise<void> {
    await this.emailSubjectSchema.deleteOne({"_id": id});
  }
}