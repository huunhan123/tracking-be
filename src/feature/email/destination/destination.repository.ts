import { Injectable } from '@nestjs/common';

import { DestinationDatasource } from './destination.datasource';
import { EmailDestinationRequestDto } from './destination.dto';
import { EmailDestinationModel } from './destination.model';
import { Queries } from 'src/shared/service/query/query.type';
import { QueryService } from 'src/shared/service/query/query.service';

@Injectable()
export class DestinationRepository {
  constructor(
    private datasource: DestinationDatasource,
    private queriesService: QueryService,
  ) {}

  async getDestinations(queries?: Queries): Promise<{ data: EmailDestinationModel[]; totalRows: number }> {
    const entities = await this.datasource.getDestinations();
    const models = entities.map(entity => new EmailDestinationModel(entity));

    const applyQueries = this.queriesService.applyQueries(
      models,
      queries,
      (a: EmailDestinationModel, b: EmailDestinationModel): number =>
        this.compareProduct(a, b, queries.orderBy),
    );

    return applyQueries;
  }

  async addDestination(destinations: EmailDestinationRequestDto[]): Promise<void> {
    return await this.datasource.addDestination(destinations);
  }

  async deleteDestination(id: string): Promise<void> {
    await this.datasource.deleteDestination(id);
  }

  private compareProduct(
    a: EmailDestinationModel,
    b: EmailDestinationModel,
    field?: string,
  ): number {
    let first: string | number | boolean = a['id'];
    let second: string | number | boolean = b['id'];
    
    if (field) {
      first = a[field];
      second = b[field];
    }

    if (first < second) {
      return -1;
    }

    if (first > second) {
      return 1;
    }

    return 0;
  }
}