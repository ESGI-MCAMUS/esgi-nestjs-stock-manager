import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  });

  const config = new DocumentBuilder()
    .setTitle('ESGI Stock Manager')
    .setDescription('Project for the ESGI course NestJS & TypeScript')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(Number(process.env.APP_PORT) ?? 3000);
}
bootstrap();
