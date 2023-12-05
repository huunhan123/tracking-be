import { EmailTemplateRequestDto } from './template.dto';
import { EmailTemplateEntity } from './template.entity';

export class EmailTemplateModel {
  id: string;
  name: string;
  url: string;

  constructor(entity: EmailTemplateEntity) {
    this.id = entity._id;
    this.name = entity.name;
    this.url = entity.url;
  }
}

// export class EmailTemplateRequestModel {
//   name: string;
//   url: string;

//   constructor(dto: EmailTemplateRequestDto) {
//     this.name = dto.name;
//     this.url = dto.url;
//   }
// }
