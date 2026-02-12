import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(cookieParser());
  app.enableCors({
    origin: [
      'http://localhost:5174',
      'http://localhost:5173',
      'https://kbfunnys.com',
      'https://www.kbfunnys.com',
      'https://api.kbfunnys.com/',
      'https://www.api.kbfunnys.com/',
      /\.kbfunnys\.com$/,
    ],

    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
