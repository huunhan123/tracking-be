import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { BaseEntity } from '../../database/mongodb/mongodb.entity';

export type EmailSenderDocument = HydratedDocument<EmailSender>;

@Schema()
export class EmailSender extends BaseEntity {
	@Prop({ required: true })
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop({ required: true })
	tag: string;
}

export const EmailSenderSchema = SchemaFactory.createForClass(EmailSender);