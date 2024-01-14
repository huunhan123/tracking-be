import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { BaseEntity } from '../database/mongodb/mongodb.entity';

export type ReportTemplateDocument = HydratedDocument<ReportTemplate>;

@Schema()
export class ReportTemplate extends BaseEntity {
	@Prop({ required: true })
	user: string;

	@Prop({ required: true })
  product: string;

	@Prop({ required: true })
  sender: string;

	@Prop({ required: true })
  template: string;

	@Prop({ required: true })
  sendAt: string;

	@Prop({ required: true})
	opens: number[]
}

export const ReportTemplateSchema = SchemaFactory.createForClass(ReportTemplate);