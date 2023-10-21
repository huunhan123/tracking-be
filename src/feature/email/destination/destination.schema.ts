import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { BaseEntity } from '../../database/mongodb/mongodb.entity';

export type EmailDestinationDocument = HydratedDocument<EmailDestination>;

@Schema()
export class EmailDestination extends BaseEntity {
	@Prop({ required: true })
	name: string;
	
	@Prop({ required: true })
	email: string;
}

export const EmailDestinationSchema = SchemaFactory.createForClass(EmailDestination); 