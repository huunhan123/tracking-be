import { EmailTemplateEntity } from './template.entity';

export class EmailTemplateModel {
  name: string;
  url: string;

  constructor(entity: EmailTemplateEntity) {
    this.name = entity.name;
    this.url = entity.url;
  }
}
