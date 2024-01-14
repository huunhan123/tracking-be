import { Injectable } from '@nestjs/common';

import { EmailSenderResponseDto } from './sender.dto';
import { ResponseModel } from 'src/shared/model/response.model';
import { EmailSenderModel } from './sender.model';

@Injectable()
export class SenderView {
  createSenders(data: {
    data: EmailSenderModel[];
    totalRows: number;
  }): ResponseModel<EmailSenderResponseDto[]> {
    
    return {
      data: data.data,
      metadata: {
        totalRows: data.totalRows,
      }
    };
  }
}