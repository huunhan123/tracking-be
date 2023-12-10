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
    const reports: ReportRequestDto[] = [];

    for (const destination of destinations.data) {
      const senderMail = await this.getSenderExpired();
      const link = await this.linkRepository.getRandomLink();
      const subject = await this.subjectRepository.getRandomSubject();
      const template = await this.templateRepository.getRandomTemplate();

      this.updateTransporter(senderMail)

      const sendMailOptions: ISendMailOptions = {
        from: senderMail.email,
        to: destination.email,
        subject: subject.greeting ? `${subject.subject} ${destination.name}` : subject.subject,
        template: template.name,
        context: {
          data: {
            name: destination.name,
            link: link.link,
            email: destination.email,
          },
        },
        transporterName: 'default',
      };

      const report: ReportRequestDto = {
        user: destination.email,
        product: template.name,
        sender: senderMail.email,
        template: template.name,
        sendAt: new Date().getTime().toString(),
      };

      const sent = await this.mailerService.sendMail(sendMailOptions);
      if (sent.accepted.length) {
        this.reportRepository.addReport(report)
        this.updateSenderExpiredTime(senderMail);
      }
    }
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