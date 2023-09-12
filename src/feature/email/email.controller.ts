import { Controller, Get } from '@nestjs/common';

import { MailService } from 'src/core/service/mail/mail.service';
import { UserInfo } from './email.type';
import { MailInfo } from 'src/core/service/mail/mail.type';
import { TrackingController } from '../tracking/tracking.controller';

@Controller()
export class EmailController {
  constructor(
    private emailService: MailService<UserInfo>,
    private readonly trackingController: TrackingController) {}

  @Get('send-email')
  async sendEmail() {
    //TODO: get user info from db
    const userInfo: UserInfo = {
      name: 'Nguyen Huu Nhan',
      email: 'nguyenhuunhan141@gmail.com',
    }

    const mailInfo: MailInfo<UserInfo> = {
      to: [userInfo.email],
      subject: 'Gửi cho vui',
      context: userInfo,
    };

    const success = await this.emailService.sendEmail(mailInfo);
    const openCount = this.trackingController.getOpenCount();
    console.log(`Email opened ${openCount} times.`);
    
    if (success) {
      return 'Email sent successfully!';
    } else {
      return 'Failed to send email.';
    }

    
  }
}