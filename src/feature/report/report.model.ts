import { ReportEntity } from './report.entity';

export class ReportModel {
  id: string;
  user: string;
  product: string;
  sender: string;
  template: string;
  sendAt: string;

  constructor(entity: ReportEntity) {
    this.id = entity._id;
    this.user = entity.user;
    this.product = entity.product;
    this.sender = entity.sender;
    this.template = entity.template;
    this.sendAt = entity.sendAt;
  }
}
