import { Controller, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';

import { ReportRepository } from '../report/report.repository';

@Controller()
export class TrackingController {
  constructor(private reportRepository: ReportRepository) {}

  @Get('track/:id')
  async trackEmail(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const opens = new Date().getTime();
    await this.reportRepository.updateReport(id, {opens: [opens]});
    
    res.sendFile('1x1.png', { root: './assets' });
  }
}