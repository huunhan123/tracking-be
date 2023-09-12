import { join } from 'path';

import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MailService } from './mail.service';
import { ProxyAgent } from 'proxy-agent';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get('SMTP_HOST'),
            port: parseInt(configService.get('PORT')),
            secure: false,
            auth: {
              user: configService.get('FROM'),
              pass: configService.get('PASSWORD'),
            },
          },
          defaults: {
            from: configService.get('FROM'),
          },
          proxy: 'http://42.96.13.139:14235',
          template: {
            dir: join(__dirname, 'view'),
            adapter: new EjsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService]
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}