import { Body, Controller, Get, Post } from '@nestjs/common';

import { DestinationRepository } from './destination.repository';
import { EmailDestinationRequestDto } from './destination.dto';

@Controller()
export class DestinationController {
  constructor(
    private repository: DestinationRepository,
  ) {}

  // @Get()
  // async getSender(): Promise<void> {
  //   await this.repository.getSender();
  // }

  @Post('add')
  async addDestination(
    @Body() resource: EmailDestinationRequestDto[],
  ): Promise<void> {
    await this.repository.addDestination(resource);
  }

  
}