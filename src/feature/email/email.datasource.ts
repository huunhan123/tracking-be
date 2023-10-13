import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { DESTINATION, EMAILS_SENDER, EMAIL_TEMPLATES } from './email.data';
import { EmailSenderEntity } from './email.entity';
import { Destination } from './email.type';
import { ReportRepository } from '../report/report.repository';

@Injectable()
export class EmailDatasource {
  private readonly EMAILS_SENDER = EMAILS_SENDER;
  private readonly EMAIL_TEMPLATES = EMAIL_TEMPLATES;
  private readonly DESTINATION = DESTINATION;

  constructor(
    private mailerService: MailerService,
    private configs: ConfigService,
    private reportRepository: ReportRepository,
  ) {}

  async sendEmail(productName: string): Promise<void> {
    const template = this.getEmailTemplateUrl(productName);
    const destinations = this.getDestinations(1);

    const sendMailPromise = destinations.map(destination => {
      const senderMail = this.getSenderMail();
      this.updateTransporter(senderMail)

      const sendMailOptions: ISendMailOptions = {
        from: senderMail.email,
        to: destination.email,
        subject: "Send mail",
        template: template,
        context: {
          data: {
            name: destination.name,
            link: 'https://google.com/',
            email: destination.email,
          },
        },
        transporterName: 'default',
      };
  
      this.mailerService.sendMail(sendMailOptions);
    });
    
    await Promise.all(sendMailPromise);
  }

  private getSenderMail(): EmailSenderEntity {
    return this.EMAILS_SENDER[Math.floor(Math.random() * this.EMAILS_SENDER.length)];
  }

  private getEmailTemplateUrl(productName: string): string {
    const emailTemplate = this.EMAIL_TEMPLATES.find(el => el.name.toLowerCase() === productName.toLowerCase());

    return emailTemplate?.url || '';
  }

  private updateTransporter(sender: EmailSenderEntity): void {    
    const transport: SMTPTransport.Options = {
      host: this.configs.get<string>('SMTP_HOST'),
      port: this.configs.get<number>('PORT'),
      auth: {
        user: sender.email,
        pass: sender.password,
      },
    };
    
    this.mailerService.addTransporter('default', transport);
  }

  private getDestinations(limit: number): Destination[] {
    return this.DESTINATION;
  }
}