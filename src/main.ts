import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const configService = new ConfigService();

  const key = configService.get<string>('SSL_PRIVATE_KEY');
  const cert = configService.get<string>('SSL_PUBLIC_CERTIFICATE');
  
  const httpsOptions = {
    key: fs.readFileSync('/shared/server.decrypted.key', 'utf8'),
    cert: fs.readFileSync('/shared/server.crt', 'utf8'),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.enableCors();
  
  app.setGlobalPrefix('api');

  const port = configService.get('PORT');
  await app.listen(3000);
}
bootstrap();
