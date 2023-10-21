import { Injectable } from '@nestjs/common';

import { DestinationDatasource } from './destination.datasource';
import { EmailDestinationRequestDto } from './destination.dto';
import { EmailDestinationModel } from './destination.model';

@Injectable()
export class DestinationRepository {
  constructor(private datasource: DestinationDatasource) {}

  async getDestinations(): Promise<EmailDestinationModel[]> {
    const entities = await this.datasource.getDestinations();
    return entities.map(entity => new EmailDestinationModel(entity));
  }

  async addDestination(destinations: EmailDestinationRequestDto[]): Promise<void> {
    return await this.datasource.addDestination(destinations);
  }
}