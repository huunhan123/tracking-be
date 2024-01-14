import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { BaseEntity } from '../../database/mongodb/mongodb.entity';

export type EmailLinkDocument = HydratedDocument<EmailLink>;

@Schema()
export class EmailLink extends BaseEntity {
	@Prop({ required: true })
	info: string;

	@Prop({ required: true })
	link: string;

	@Prop({ required: true })
	tag: string;
}

export const EmailLinkSchema = SchemaFactory.createForClass(EmailLink);