import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { EmailSenderEntity } from './email.entity';
import { ReportDatasource } from '../report/report.datasource';
import { SenderDatasource } from './sender/sender.datasource';
import { DestinationDatasource } from './destination/destination.datasource';
import { TemplateDatasource } from './template/template.datasource';
import { ReportRequestDto } from '../report/report.dto';
import { Queries } from 'src/shared/service/query/query.type';

@Injectable()
export class EmailDatasource {
  constructor(
    private mailerService: MailerService,
    private configs: ConfigService,
    private reportDatasource: ReportDatasource,
    private senderDatasource: SenderDatasource,
    private destinationDatasource:DestinationDatasource,
    private templateDatasource: TemplateDatasource,
  ) {}

  async sendEmail(productName: string, queries: Queries): Promise<void> {
    const template = await this.getEmailTemplateUrl(productName);
    const destinations = await this.destinationDatasource.getDestinations();
    const reports: ReportRequestDto[] = [];

    const sendMailPromise = destinations.map(async (destination) => {
      const senderMail = await this.senderDatasource.getRandomSender();
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
      const report: ReportRequestDto = {
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
        this.reportDatasource.addReport(reports[index]);
      }
    });
  }

  private async getEmailTemplateUrl(productName: string): Promise<string> {
    const emailTemplate = await this.templateDatasource.getTemplate(productName);

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