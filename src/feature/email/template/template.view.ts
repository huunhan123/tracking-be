import { Injectable } from '@nestjs/common';

import { EmailTemplateResponseDto } from './template.dto';
import { ResponseModel } from 'src/shared/model/response.model';
import { EmailTemplateModel } from './template.model';

@Injectable()
export class TemplateView {
  createTemplates(data: {
    data: EmailTemplateModel[];
    totalRows: number;
  }): ResponseModel<EmailTemplateResponseDto[]> {
    
    return {
      data: data.data,
      metadata: {
        totalRows: data.totalRows,
      }
    };
  }
}