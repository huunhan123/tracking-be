import { EmailSubjectEntity } from './subject.entity';

export class EmailSubjectModel {
  id: string;
  subject: string;
  type: string;
  tag: string;

  constructor(entity: EmailSubjectEntity) {
    this.id = entity._id;
    this.subject = entity.subject;
    this.type = entity.type;
    this.tag = entity.tag;
  }
}
