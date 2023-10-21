import { EmailDestinationEntity } from './destination.entity';
import { EmailDestination } from './destination.schema';

export class EmailDestinationModel {
  name: string;
  email: string;

  constructor(entity: EmailDestination) {
    this.name = entity.name;
    this.email = entity.email;
  }
}