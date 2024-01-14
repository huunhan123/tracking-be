import { EmailSenderRequestDto } from './sender.dto';
import { EmailSenderEntity } from './sender.entity';
import { ConfigService } from '@nestjs/config';

export class EmailSenderModel {
  id: string;
  email: string;
  password: string;
  tag: string;
  nextTime: number;

  constructor(entity: EmailSenderEntity) {
    this.id = entity._id;
    this.email = entity.email;
    this.password = entity.password;
    this.tag = entity.tag;
    this.nextTime = entity.nextTime;
  }
}

export class EmailSenderRequestModel {
  email: string;
  password: string;
  tag: string;
  nextTime: number;

  constructor(dto: EmailSenderRequestDto) {
    this.email = dto.email;
    this.password = dto.password;
    this.tag = dto.tag;
    this.nextTime = new Date().getTime() + Number(process.env.NEXT_SEND);
  }
}