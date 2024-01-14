import { EmailLinkEntity } from './link.entity';

export class EmailLinkModel {
  id: string;
  info: string;
  link: string;
  tag: string;

  constructor(entity: EmailLinkEntity) {
    this.id = entity._id;
    this.info = entity.info;
    this.link = entity.link;
    this.tag = entity.tag;
  }
}
