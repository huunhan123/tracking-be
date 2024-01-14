import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { QueryService } from './service/query/query.service';
import { APIResponseService } from './service/api-response/api-response.service';

@Module({
  imports: [ConfigModule],
  providers: [QueryService, APIResponseService],
  exports: [QueryService, APIResponseService],
})
export class SharedModule {}
