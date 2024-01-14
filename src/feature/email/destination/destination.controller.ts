import { Body, Controller, Get, Param, Post, Delete, Query, ValidationPipe } from '@nestjs/common';

import { DestinationRepository } from './destination.repository';
import { EmailDestinationRequestDto, EmailDestinationResponseDto } from './destination.dto';
import { DestinationView } from './destination.view';
import { Queries } from 'src/shared/service/query/query.type';
import { ResponseModel } from 'src/shared/model/response.model';

@Controller()
export class DestinationController {
  constructor(
    private repository: DestinationRepository,
    private view: DestinationView,
  ) {}

  @Get()
  async getDestinations(@Query(ValidationPipe) queries: Queries): Promise<ResponseModel<EmailDestinationResponseDto[]>> {
    const data = await this.repository.getDestinations(queries);

    const response = this.view.createDestinations(data);
    return response;
  }

  @Post('add')
  async addDestination(
    @Body() resource: EmailDestinationRequestDto[],
  ): Promise<void> {
    await this.repository.addDestination(resource);
  }

  @Delete('delete/:id')
  async deleteDestination(
    @Param('id') id: string,
  ): Promise<void> {
    await this.repository.deleteDestination(id);
  }
}