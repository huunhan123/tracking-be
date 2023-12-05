import { EmailLinkEntity } from './link.entity';

export class EmailLinkModel {
  id: string;
  link: string;
  tag: string;

  constructor(entity: EmailLinkEntity) {
    this.id = entity._id;
    this.link = entity.link;
    this.tag = entity.tag;
  }
}
