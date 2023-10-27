import { EmailTemplateEntity } from './template.entity';

export class EmailTemplateModel {
  id: string;
  name: string;
  url: string;

  constructor(entity: EmailTemplateEntity) {
    this.id = entity._id;
    this.name = entity.name;
    this.url = entity.url;
  }
}
