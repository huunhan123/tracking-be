import { EmailSenderEntity } from './sender.entity';

export class EmailSenderModel {
  email: string;
  password: string;

  constructor(entity: EmailSenderEntity) {
    this.email = entity.email;
    this.password = entity.password;
  }
}
