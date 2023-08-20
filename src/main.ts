import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const APP_PORT = configService.get<string>('APP_PORT');

  app.enableCors();
  await app.listen(APP_PORT);
  Logger.log(`🚀 Application is running on port : ${APP_PORT}`);
}
bootstrap();
