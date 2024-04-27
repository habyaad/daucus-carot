import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT_NO || 3005
  await app.listen(port);
  logger.log(`Backend app listening on port: ${port}`)
}
bootstrap();
