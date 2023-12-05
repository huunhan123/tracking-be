import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeaturesModule } from './feature/feature.module';
import { APP_ROUTES } from './app.routes';

@Module({
  imports: [
    FeaturesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*'],
    }),
    RouterModule.register(APP_ROUTES),
    MailerModule.forRoot({
      transports: {
        default: {},
      },
      template: {
        dir: join(__dirname, './views'),
        adapter: new EjsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${__dirname}/core/config/.env.${process.env.ENV}`,
    }),
    MongooseModule.forRoot('mongodb://158.179.174.23:27017/test')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
