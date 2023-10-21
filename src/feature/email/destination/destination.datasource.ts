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

  async getDestinations(limit?: number): Promise<EmailDestination[]> {
    const destinations = await this.emailDestinationSchema.find().exec();
    
    return destinations;
  }

  async addDestination(destinations: EmailDestinationRequestDto[]): Promise<void> {
    await this.emailDestinationSchema.insertMany(destinations);
  }
}