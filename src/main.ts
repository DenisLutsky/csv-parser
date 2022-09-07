import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { config } from './configs/app.config';

import { AppModule } from './app.module';

(async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bodyParser: true });

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(config.app.port);
})();
