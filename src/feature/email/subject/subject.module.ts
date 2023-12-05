import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SubjectController } from './subject.controller';
import { SubjectDatasource } from './subject.datasource';
import { SubjectRepository } from './subject.repository';
import { EmailSubject, EmailSubjectSchema } from './subject.schema';
import { SharedModule } from 'src/shared/shared.module';
import { SubjectView } from './subject.view';

@Module({
  controllers: [
    SubjectController,
  ],
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: EmailSubject.name, schema: EmailSubjectSchema }]),
  ],
  providers: [
    SubjectDatasource,
    SubjectRepository,
    SubjectView,
  ],
  exports: [
    SubjectDatasource,
    SubjectRepository,
  ],
})
export class SubjectModule {}