import { Injectable } from '@nestjs/common';

import { EmailProxyResponseDto } from './proxy.dto';
import { ResponseModel } from 'src/shared/model/response.model';
import { EmailProxyModel } from './proxy.model';

@Injectable()
export class ProxyView {
  createProxys(data: {
    data: EmailProxyModel[];
    totalRows: number;
  }): ResponseModel<EmailProxyResponseDto[]> {
    
    return {
      data: data.data,
      metadata: {
        totalRows: data.totalRows,
      }
    };
  }
}