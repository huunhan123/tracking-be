// src/tracking/tracking.controller.ts

import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('track')
export class TrackingController {
  private openCount = 0; // Biến đếm số lần mở email.

  @Get('pixel.png')
  trackEmail(@Res() res: Response) {
    // Tăng biến đếm mỗi khi pixel theo dõi được tải lên từ email.
    this.openCount++;
    console.log(this.openCount);
    
    // Trả về một pixel 1x1 (vd: 1x1.png) để theo dõi.
    res.sendFile('1x1.png', { root: './assets' }); // Thay đổi đường dẫn pixel tùy theo tên và định dạng của bạn.
  }

  getOpenCount(): number {
    return this.openCount;
  }
}