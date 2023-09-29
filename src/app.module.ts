import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeaturesModule } from './feature/feature.module';
import { APP_ROUTES } from './app.routes';
// import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // CoreModule,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
