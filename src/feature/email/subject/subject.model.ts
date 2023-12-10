import { EmailSubjectEntity } from './subject.entity';

export class EmailSubjectModel {
  id: string;
  subject: string;
  greeting: boolean;
  tag: string;

  constructor(entity: EmailSubjectEntity) {
    this.id = entity._id;
    this.subject = entity.subject;
    this.greeting = entity.greeting;
    this.tag = entity.tag;
  }
}
