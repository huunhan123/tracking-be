import { ReportEntity } from './report.entity';

export class ReportModel {
  user: string;
  product: string;
  sender: string;
  template: string;

  constructor(entity: ReportEntity) {
    this.user = entity.user;
    this.product = entity.product;
    this.sender = entity.sender;
    this.template = entity.template;
  }
}
