import { Injectable } from '@nestjs/common';

import { LinkDatasource } from './link.datasource';
import { EmailLinkRequestDto } from './link.dto';
import { Queries } from 'src/shared/service/query/query.type';
import { QueryService } from 'src/shared/service/query/query.service';
import { EmailLinkModel } from './link.model';

@Injectable()
export class LinkRepository {
  constructor(
    private datasource: LinkDatasource,
    private queriesService: QueryService,
  ) {}

  async getLinks(queries: Queries): Promise<{ data: EmailLinkModel[]; totalRows: number }> {
    const entities = await this.datasource.getLinks();
    const models = entities.map(entity => new EmailLinkModel(entity));

    const applyQueries = this.queriesService.applyQueries(
      models,
      queries,
      (a: EmailLinkModel, b: EmailLinkModel): number =>
        this.compareProduct(a, b, queries.orderBy),
    );

    return applyQueries;
  }

  async addLink(senders: EmailLinkRequestDto[]): Promise<void> {
    return await this.datasource.addLink(senders);
  }

  async getRandomLink(): Promise<EmailLinkModel> {
    const entity = await this.datasource.getRandomLink();
    const model = new EmailLinkModel(entity);

    return model;
  }

  async deleteLink(id: string): Promise<void> {
    await this.datasource.deleteLink(id);
  }

  private compareProduct(
    a: EmailLinkModel,
    b: EmailLinkModel,
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