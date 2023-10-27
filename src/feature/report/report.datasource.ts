import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ReportEntity } from './report.entity';
import { ReportRequestDto } from './report.dto';
import { ReportTemplate } from './report.shema';

@Injectable()
export class ReportDatasource {
  constructor(
    @InjectModel(ReportTemplate.name) private reportTemplateSchema: Model<ReportTemplate>
  ) {}

  async getReport(): Promise<ReportEntity[]> {
    return await this.reportTemplateSchema.find().exec();
  }

  async addReport(report: ReportRequestDto): Promise<void> {
    await this.reportTemplateSchema.insertMany(report);
  }
}