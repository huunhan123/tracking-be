import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { BaseEntity } from '../../database/mongodb/mongodb.entity';

export type EmailProxyDocument = HydratedDocument<EmailProxy>;

@Schema()
export class EmailProxy extends BaseEntity {
	@Prop({ required: true })
	host: string;

	@Prop({ required: true })
	port: number;

	@Prop({ required: true })
	tag: string;
}

export const EmailProxySchema = SchemaFactory.createForClass(EmailProxy);