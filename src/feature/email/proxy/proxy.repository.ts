import { Injectable } from '@nestjs/common';

import { ProxyDatasource } from './proxy.datasource';
import { EmailProxyRequestDto } from './proxy.dto';
import { Queries } from 'src/shared/service/query/query.type';
import { QueryService } from 'src/shared/service/query/query.service';
import { EmailProxyModel } from './proxy.model';

@Injectable()
export class ProxyRepository {
  constructor(
    private datasource: ProxyDatasource,
    private queriesService: QueryService,
  ) {}

  async getProxys(queries: Queries): Promise<{ data: EmailProxyModel[]; totalRows: number }> {
    const entities = await this.datasource.getProxys();
    const models = entities.map(entity => new EmailProxyModel(entity));

    const applyQueries = this.queriesService.applyQueries(
      models,
      queries,
      (a: EmailProxyModel, b: EmailProxyModel): number =>
        this.compareProduct(a, b, queries.orderBy),
    );

    return applyQueries;
  }

  async addProxy(senders: EmailProxyRequestDto[]): Promise<void> {
    return await this.datasource.addProxy(senders);
  }

  async getRandomProxy(): Promise<EmailProxyModel> {
    const entity = await this.datasource.getRandomProxy();
    const model = new EmailProxyModel(entity);

    return model;
  }

  async deleteProxy(id: string): Promise<void> {
    await this.datasource.deleteProxy(id);
  }

  private compareProduct(
    a: EmailProxyModel,
    b: EmailProxyModel,
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