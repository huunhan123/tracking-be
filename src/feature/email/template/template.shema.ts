import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { BaseEntity } from '../../database/mongodb/mongodb.entity';

export type EmailTemplateDocument = HydratedDocument<EmailTemplate>;

@Schema()
export class EmailTemplate extends BaseEntity {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	url: string;
}

export const EmailTemplateSchema = SchemaFactory.createForClass(EmailTemplate);