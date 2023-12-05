import { Injectable } from '@nestjs/common';

import { TemplateDatasource } from './template.datasource';
import { EmailTemplateModel } from './template.model';
import { EmailTemplateRequestDto } from './template.dto';
import { Queries } from 'src/shared/service/query/query.type';
import { QueryService } from 'src/shared/service/query/query.service';

@Injectable()
export class TemplateRepository {
  constructor(
    private datasource: TemplateDatasource,
    private queriesService: QueryService,
  ) {}

  async getTemplates(queries: Queries): Promise<{ data: EmailTemplateModel[]; totalRows: number }> {
    const entities = await this.datasource.getTemplates();
    const models =  entities.map(entity => new EmailTemplateModel(entity));

    const applyQueries = this.queriesService.applyQueries(
      models,
      queries,
      (a: EmailTemplateModel, b: EmailTemplateModel): number =>
        this.compareProduct(a, b, queries.orderBy),
    );

    return applyQueries;
  }

  async addTemplate(templateDto: EmailTemplateRequestDto): Promise<void> {
    return await this.datasource.addTemplate(templateDto);
  }

  async getTemplate(productName: string): Promise<EmailTemplateModel> {
    const entity = await this.datasource.getTemplate(productName);
    const model = new EmailTemplateModel(entity);

    return model;
  }

  async deleteTemplate(id: string): Promise<void> {
    await this.datasource.deleteTemplate(id);
  }

  private compareProduct(
    a: EmailTemplateModel,
    b: EmailTemplateModel,
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