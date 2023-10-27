import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TemplateController } from './template.controller';
import { TemplateDatasource } from './template.datasource';
import { TemplateRepository } from './template.repository';
import { EmailTemplate, EmailTemplateSchema } from './template.shema';
import { SharedModule } from 'src/shared/shared.module';
import { TemplateView } from './template.view';

@Module({
  controllers: [
    TemplateController,
  ],
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: EmailTemplate.name, schema: EmailTemplateSchema }]),
  ],
  providers: [
    TemplateDatasource,
    TemplateRepository,
    TemplateView,
  ],
  exports: [
    TemplateDatasource,
    TemplateRepository,
  ],
})
export class TemplateModule {}