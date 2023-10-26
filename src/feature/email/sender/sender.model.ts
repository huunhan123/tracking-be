import { EmailSenderEntity } from './sender.entity';

export class EmailSenderModel {
  id: string;
  email: string;
  password: string;

  constructor(entity: EmailSenderEntity) {
    this.id = entity._id;
    this.email = entity.email;
    this.password = entity.password;
  }
}
