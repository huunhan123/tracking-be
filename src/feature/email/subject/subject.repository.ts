import { Injectable } from '@nestjs/common';

import { SubjectDatasource } from './subject.datasource';
import { EmailSubjectRequestDto } from './subject.dto';
import { Queries } from 'src/shared/service/query/query.type';
import { QueryService } from 'src/shared/service/query/query.service';
import { EmailSubjectModel } from './subject.model';

@Injectable()
export class SubjectRepository {
  constructor(
    private datasource: SubjectDatasource,
    private queriesService: QueryService,
  ) {}

  async getSubjects(queries: Queries): Promise<{ data: EmailSubjectModel[]; totalRows: number }> {
    const entities = await this.datasource.getSubjects();
    const models = entities.map(entity => new EmailSubjectModel(entity));

    const applyQueries = this.queriesService.applyQueries(
      models,
      queries,
      (a: EmailSubjectModel, b: EmailSubjectModel): number =>
        this.compareProduct(a, b, queries.orderBy),
    );

    return applyQueries;
  }

  async addSubject(senders: EmailSubjectRequestDto[]): Promise<void> {
    return await this.datasource.addSubject(senders);
  }

  async getRandomSubject(): Promise<EmailSubjectModel> {
    const entity = await this.datasource.getRandomSubject();
    const model = new EmailSubjectModel(entity);

    return model;
  }

  async deleteSubject(id: string): Promise<void> {
    await this.datasource.deleteSubject(id);
  }

  private compareProduct(
    a: EmailSubjectModel,
    b: EmailSubjectModel,
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