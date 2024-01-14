import { Injectable } from '@nestjs/common';

import { EmailDestinationResponseDto } from './destination.dto';
import { ResponseModel } from 'src/shared/model/response.model';
import { EmailDestinationModel } from './destination.model';

@Injectable()
export class DestinationView {
  createDestinations(data: {
    data: EmailDestinationModel[];
    totalRows: number;
  }): ResponseModel<EmailDestinationResponseDto[]> {
    
    return {
      data: data.data,
      metadata: {
        totalRows: data.totalRows,
      }
    };
  }
}