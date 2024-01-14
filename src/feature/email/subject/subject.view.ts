import { Injectable } from '@nestjs/common';

import { EmailSubjectResponseDto } from './subject.dto';
import { ResponseModel } from 'src/shared/model/response.model';
import { EmailSubjectModel } from './subject.model';

@Injectable()
export class SubjectView {
  createSubjects(data: {
    data: EmailSubjectModel[];
    totalRows: number;
  }): ResponseModel<EmailSubjectResponseDto[]> {
    
    return {
      data: data.data,
      metadata: {
        totalRows: data.totalRows,
      }
    };
  }
}