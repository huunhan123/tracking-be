import { EmailDestination } from './destination.schema';

export class EmailDestinationModel {
  id: string;
  name: string;
  email: string;

  constructor(entity: EmailDestination) {
    this.id = entity._id;
    this.name = entity.name;
    this.email = entity.email;
  }
}