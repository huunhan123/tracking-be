import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { BaseEntity } from '../../database/mongodb/mongodb.entity';

export type EmailSubjectDocument = HydratedDocument<EmailSubject>;

@Schema()
export class EmailSubject extends BaseEntity {
	@Prop({ required: true })
	subject: string;

	@Prop({ required: true })
	type: string;

	@Prop({ required: true })
	tag: string;
}

export const EmailSubjectSchema = SchemaFactory.createForClass(EmailSubject);