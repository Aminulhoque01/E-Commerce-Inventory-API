import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { Server } from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  // Get underlying HTTP server before starting
  const server = app.getHttpServer();
  const io = new Server(server, {
    cors: {
      origin: '*', // configure properly in production
    },
  });

  io.on('connection', (socket) => {
    console.log('⚡ New client connected:', socket.id);

    socket.on('message', (data) => {
      console.log('Received message:', data);
    });

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id);
    });
  });

  await app.listen(8083);
  console.log('🚀 Server running on http://localhost:8083');
}
bootstrap();

