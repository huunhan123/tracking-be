import { Injectable } from '@nestjs/common';

import { EmailLinkResponseDto } from './link.dto';
import { ResponseModel } from 'src/shared/model/response.model';
import { EmailLinkModel } from './link.model';

@Injectable()
export class LinkView {
  createLinks(data: {
    data: EmailLinkModel[];
    totalRows: number;
  }): ResponseModel<EmailLinkResponseDto[]> {
    
    return {
      data: data.data,
      metadata: {
        totalRows: data.totalRows,
      }
    };
  }
}