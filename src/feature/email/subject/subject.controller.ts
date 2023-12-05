import { Body, Controller, Get, Post, Delete, Query, ValidationPipe, Param } from '@nestjs/common';

import { SubjectRepository } from './subject.repository';
import { EmailSubjectRequestDto, EmailSubjectResponseDto } from './subject.dto';
import { SubjectView } from './subject.view';
import { ResponseModel } from 'src/shared/model/response.model';
import { Queries } from 'src/shared/service/query/query.type';

@Controller()
export class SubjectController {
  constructor(
    private repository: SubjectRepository,
    private view: SubjectView,
  ) {}

  @Get()
  async getSubjects(@Query(ValidationPipe) queries: Queries): Promise<ResponseModel<EmailSubjectResponseDto[]>> {
    const data = await this.repository.getSubjects(queries);

    const response = this.view.createSubjects(data);
    return response;
  }

  @Post('add')
  async addSubject(
    @Body() resource: EmailSubjectRequestDto[],
  ): Promise<void> {
    await this.repository.addSubject(resource);
  }

  @Delete('delete/:id')
  async deleteSubject(
    @Param('id') id: string,
  ): Promise<void> {
    await this.repository.deleteSubject(id);
  }
}