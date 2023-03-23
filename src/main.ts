import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import helmet from 'helmet';
import * as compression from 'compression';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  });

  const config = new DocumentBuilder()
    .setTitle('ESGI Stock Manager')
    .setDescription('Project for the ESGI course NestJS & TypeScript')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(helmet());
  app.use(compression());
  await app.listen(Number(process.env.APP_PORT) ?? 3000);
}
bootstrap();
