import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { EmailSenderEntity } from './email.entity';
import { ReportRequestDto } from '../report/report.dto';
import { ReportRepository } from '../report/report.repository';
import { SenderRepository } from './sender/sender.repository';
import { DestinationRepository } from './destination/destination.repository';
import { TemplateRepository } from './template/template.repository';
import { EmailSenderModel } from './sender/sender.model';
import { LinkRepository } from './link/link.repository';
import { SubjectRepository } from './subject/subject.repository';
import { MailOption } from './email.type';

@Injectable()
export class EmailDatasource {
  constructor(
    private mailerService: MailerService,
    private configs: ConfigService,
    private reportRepository: ReportRepository,
    private senderRepository: SenderRepository,
    private destinationRepository:DestinationRepository,
    private templateRepository: TemplateRepository,
    private linkRepository: LinkRepository,
    private subjectRepository: SubjectRepository,
  ) {}

  async sendEmails(): Promise<void> {
    const destinations = await this.destinationRepository.getDestinations();

    for (const destination of destinations.data) {
      const senderMail = await this.getSenderExpired();
      const link = await this.linkRepository.getRandomLink();
      const subject = await this.subjectRepository.getRandomSubject();
      const template = await this.templateRepository.getRandomTemplate();

      const report: ReportRequestDto = {
        user: destination.email,
        product: template.name,
        sender: senderMail.email,
        template: template.name,
        sendAt: new Date().getTime().toString(),
        opens: [],
      };

      const addReport = await this.reportRepository.addReport(report);
      const reportID =  addReport[0]._id;

      this.updateTransporter(senderMail)

      const sendMailOptions = this.createMailOptions({
        sender: senderMail.email,
        destination,
        subject,
        template,
        link: link.link,
        reportID: reportID,  
      });
      const sent = await this.mailerService.sendMail(sendMailOptions);
      
      if (sent.accepted.length) {
        this.updateSenderExpiredTime(senderMail);
      } else {
        this.reportRepository.deleteReportById(reportID);
      }
    }
  }

  private createMailOptions(mailOption: MailOption): ISendMailOptions {
    const options = {
      from: mailOption.sender,
      to: mailOption.destination.email,
      subject: mailOption.subject.greeting ? `${mailOption.subject.subject} ${mailOption.destination.name}` : mailOption.subject.subject,
      template: mailOption.template.name,
      context: {
        data: {
          name: mailOption.destination.name,
          link: mailOption.link,
          email: mailOption.destination.email,
          uuid: mailOption.reportID,
        },
      },
      transporterName: 'default',
    };

    return options;
  }

  private async getSenderExpired(): Promise<EmailSenderModel> {
    const sender = await this.senderRepository.getRandomSender();
    if (sender.nextTime > new Date().getTime()) {
      await this.getSenderExpired();
    }

    return sender;
  }

  private async updateSenderExpiredTime(model: EmailSenderModel): Promise<void> {
    const dto = {
      email: model.email,
      password: model.password,
      tag: model.tag,
      nextTime: model.nextTime,
    };

    await this.senderRepository.updateSender(model.id, dto);
  }

  private updateTransporter(sender: EmailSenderEntity): void {    
    const transport: SMTPTransport.Options = {
      host: this.configs.get<string>('SMTP_HOST'),
      port: this.configs.get<number>('MAIL_PORT'),
      auth: {
        user: sender.email,
        pass: sender.password,
      },
    };
    
    this.mailerService.addTransporter('default', transport);
  }
}