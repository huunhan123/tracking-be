import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { EmailDestinationRequestDto } from './destination.dto';
import { EmailDestination } from './destination.schema';

@Injectable()
export class DestinationDatasource {
  constructor(
    @InjectModel(EmailDestination.name) private emailDestinationSchema: Model<EmailDestination>
  ) {}

  async getDestinations(page?: number, rpp?: number): Promise<{data: EmailDestination[], totalRows: number}> {
    let data;
    const totalRows = await this.emailDestinationSchema.estimatedDocumentCount();

    if (page && rpp) {
      data = await this.emailDestinationSchema.find().skip((page - 1) * rpp).limit(rpp).exec();
    } else {
      data = await this.emailDestinationSchema.find().exec();
    }

    return {totalRows, data};
  }

  async addDestination(destinations: EmailDestinationRequestDto[]): Promise<void> {
    await this.emailDestinationSchema.insertMany(destinations);
  }

  async deleteDestination(id: string): Promise<void> {
    await this.emailDestinationSchema.deleteOne({"_id": id});
  }
}