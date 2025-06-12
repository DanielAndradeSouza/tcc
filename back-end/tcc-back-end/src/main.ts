import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    
  );

  app.use(cookieParser())
  // Habilita CORS para permitir que o front (ex: Next.js) consiga acessar a API
  app.enableCors({
    origin: 'http://localhost:3000', // Permite o front-end acessar a API
    credentials: true, // Permite enviar cookies ou headers de autenticação
  });
  
  await app.listen(process.env.PORT ?? 3050);
}
bootstrap();
