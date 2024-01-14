import { Injectable } from '@nestjs/common';

import { APIResponse } from './api-response.type';

@Injectable()
export class APIResponseService {
  createResponse<T, U>(data?: T, metadata?: U): APIResponse<T, U> {
    const response: APIResponse<T, U> = {
      data,
      metadata,
    };

    return response;
  }
}
