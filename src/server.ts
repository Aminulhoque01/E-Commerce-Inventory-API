


import colors from 'colors';
import { Server } from 'socket.io';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';
import { socketHelper } from './app/socket/socket';
import prisma from './shared/prisma';
 

let server: any;

async function main() {
  try {
    // Test PostgreSQL connection
    await prisma.$connect();
    logger.info(colors.green('🚀 Database connected successfully'));

    // Start server
    const port = Number(config.port);
    server = app.listen(port, config.backendIp as string, () => {
      logger.info(colors.yellow(`♻️  Application listening on http://localhost:${port}`));
    });

    // Setup Socket.IO
    const io = new Server(server, { pingTimeout: 60000, cors: { origin: '*' } });
    socketHelper.socket(io);
    // @ts-ignore
    global.io = io;

  } catch (error) {
    errorLogger.error(colors.red('🤢 Failed to connect Database'), error);
  }

  // Handle unhandled rejections
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error('Unhandled Rejection Detected', error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();
