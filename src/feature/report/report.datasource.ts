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

  async getReports(): Promise<ReportEntity[]> {
    return await this.reportTemplateSchema.find().exec();
  }

  async addReport(report: ReportRequestDto) {
    return await this.reportTemplateSchema.insertMany(report);
  }

  async getReportById(id: string): Promise<ReportEntity> {
    return await this.reportTemplateSchema.findById(id);
  }

  async updateReport(id: string, report: Partial<ReportRequestDto>) {
    const hasOpenField = 'opens' in report;

    const updateObject: any = {
      $set: report,
    };

    if (hasOpenField) {
      updateObject.$push = { opens: { $each: report.opens } };
      delete updateObject.$set.opens;
    }

    return await this.reportTemplateSchema.updateOne({_id: id}, updateObject, {new: true});
  }

  async deleteReportById(id: string): Promise<void> {
    await this.reportTemplateSchema.deleteOne({_id: id});
  }
}