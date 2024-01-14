import { EmailProxyEntity } from './proxy.entity';

export class EmailProxyModel {
  id: string;
  host: string;
  port: number;
  tag: string;

  constructor(entity: EmailProxyEntity) {
    this.id = entity._id;
    this.host = entity.host;
    this.port = entity.port;
    this.tag = entity.tag;
  }
}
