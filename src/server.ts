import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

process.on('uncaughtException', error => {
  console.log(
    'Uncought exceptinal is detected, we are closing our server.......'
  );
  console.error(error);
  process.exit(1);
});
let server: Server;

async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.info('Database is connected successfully!!!');
    server = app.listen(config.port, () => {
      console.info(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to database connect!');
  }

  process.on('unhandledRejection', error => {
    console.log(
      'Unhandled rejection is detected, we are closing our server.......'
    );
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

boostrap();

process.on('SIGTERM', () => {
  console.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
