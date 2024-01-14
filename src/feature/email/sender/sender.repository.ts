import { Injectable } from '@nestjs/common';

import { SenderDatasource } from './sender.datasource';
import { EmailSenderRequestDto } from './sender.dto';
import { Queries } from 'src/shared/service/query/query.type';
import { QueryService } from 'src/shared/service/query/query.service';
import { EmailSenderModel, EmailSenderRequestModel } from './sender.model';

@Injectable()
export class SenderRepository {
  constructor(
    private datasource: SenderDatasource,
    private queriesService: QueryService,
  ) {}

  async getSenders(queries: Queries): Promise<{ data: EmailSenderModel[]; totalRows: number }> {
    const {page, rpp} = queries;
    
    const entities = await this.datasource.getSenders(page, rpp);
    // const models = entities.map(entity => new EmailSenderModel(entity));

    // const applyQueries = this.queriesService.applyQueries(
    //   models,
    //   queries,
    //   (a: EmailSenderModel, b: EmailSenderModel): number =>
    //     this.compareProduct(a, b, queries.orderBy),
    // );

    // return applyQueries;
    return {
      data: entities.data.map(entity => new EmailSenderModel(entity)),
      totalRows: entities.totalRows,
    };
  }

  async addSender(senders: EmailSenderRequestDto[]): Promise<void> {
    const model = senders.map(sender => new EmailSenderRequestModel(sender));

    return await this.datasource.addSender(model);
  }

  async getRandomSender(): Promise<EmailSenderModel> {
    const entity = await this.datasource.getRandomSender();
    const model = new EmailSenderModel(entity);

    return model;
  }

  async updateSender(id: string, sender: EmailSenderRequestDto): Promise<void> {
    const model = new EmailSenderRequestModel(sender);
    
    await this.datasource.updateSender(id, model);
  }

  async deleteSender(id: string): Promise<void> {
    await this.datasource.deleteSender(id);
  }

  private compareProduct(
    a: EmailSenderModel,
    b: EmailSenderModel,
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