import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { EmailSenderEntity } from './email.entity';
import { ReportRepository } from '../report/report.repository';
import { SenderRepository } from './sender/sender.repository';
import { DestinationRepository } from './destination/destination.repository';
import { TemplateRepository } from './template/template.repository';
import { ReportRequestDto } from '../report/report.dto';
import { ReportEntity } from '../report/report.entity';

@Injectable()
export class EmailDatasource {
  constructor(
    private mailerService: MailerService,
    private configs: ConfigService,
    private reportRepository: ReportRepository,
    private senderRepository: SenderRepository,
    private destinationRepository:DestinationRepository,
    private templateRepository: TemplateRepository,
  ) {}

  async sendEmail(productName: string): Promise<void> {
    const template = await this.getEmailTemplateUrl(productName);
    const destinations = await this.destinationRepository.getDestinations();
    const reports: ReportRequestDto[] = [];

    const sendMailPromise = destinations.map(async (destination) => {
      const senderMail = await this.senderRepository.getRandomSender();
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
      const report: ReportEntity = {
        user: destination.email,
        product: productName,
        sender: senderMail.email,
        template: template,
        sendAt: new Date().getTime().toString(),
      };
      reports.push(report);

      this.mailerService.sendMail(sendMailOptions);
    });
    
    const sendMail = await Promise.allSettled(sendMailPromise);

    sendMail.forEach((send, index) => {
      if(send.status === 'fulfilled') {
        this.reportRepository.addReport(reports[index]);
      }
    });
  }

  private async getEmailTemplateUrl(productName: string): Promise<string> {
    const emailTemplate = await this.templateRepository.getTemplate(productName);

    return emailTemplate.url || '';
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
}