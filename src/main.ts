import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const configService = new ConfigService();

  const key = configService.get<string>('SSL_PRIVATE_KEY');
  const cert = configService.get<string>('SSL_PUBLIC_CERTIFICATE');
  
  const httpsOptions = {
    key: fs.readFileSync(key, 'utf8'),
    cert: fs.readFileSync(cert, 'utf8'),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.use(bodyParser.json({limit: '500gb'}));
  app.use(bodyParser.urlencoded({limit: '500gb', extended: true}));
  app.enableCors();
  
  app.setGlobalPrefix('api');

  const port = configService.get<number>('PORT');
  await app.listen(port);
}
bootstrap();
