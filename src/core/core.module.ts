import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${__dirname}/config/.env.${process.env.ENV}`,
    }),
  ],
  providers: [],
  exports: [],
})
export class CoreModule {}