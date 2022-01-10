import mongoose from 'mongoose';

import app from './app';

const { DB_URI, PORT = 5000 } = process.env;

mongoose.connect(DB_URI).then(() =>
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  })
);

process
  .on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection');
    console.log(reason, promise);
  })
  .on('uncaughtException', (error) => {
    console.log('Uncaught Exception');
    console.log(error);
    if (!error.isOperational) process.exit(1);
  });
