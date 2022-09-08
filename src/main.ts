import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from './configs/app.config';
import './configs/timezone.config';

import { AppModule } from './app.module';

(async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bodyParser: true });

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder().setTitle('CSV-parser documentation').build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.app.port);
})();
