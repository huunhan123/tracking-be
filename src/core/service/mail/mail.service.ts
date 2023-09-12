import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { MailInfo, MailTransport } from './mail.type';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService<T> {
  constructor(private mailerService: MailerService) {}

  async sendEmail(data: MailInfo<T>): Promise<any> {
    console.log(data.context);
    
    return await this.mailerService.sendMail({
      to: data.to,
      subject: data.subject,
      template: '../../../../view/mail',
      context: {
        data: data.context,
      },
    });
  }
}