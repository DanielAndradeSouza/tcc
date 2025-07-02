import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { CustomSocketIoAdapter } from './Entidades/scene/scene_state_module/socket.io-adapter';

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule
  );
  app.useWebSocketAdapter(new CustomSocketIoAdapter(app));

  app.use(cookieParser())
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ limit: '100mb', extended: true }));

  app.enableCors({
    origin: 'http://localhost:3000', 
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 3050);
}
bootstrap();
