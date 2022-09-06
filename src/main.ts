import { NestFactory } from '@nestjs/core';
import { config } from './config/app.config';

import { AppModule } from './app.module';

(async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bodyParser: true });

  app.enableCors();

  await app.listen(config.app.port);
})();
