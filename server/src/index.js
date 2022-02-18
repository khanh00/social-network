import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';

import routes from './routes';
import { apiQueryParams, handleError } from './middleware';
import { httpStatus } from './constants';
import { sendJsonRes } from './utils';
import socket from './socket';

dotenv.config();

const { DB_URI, PORT = 5000 } = process.env;
const __dirname = dirname(fileURLToPath(import.meta.url));
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
};
const app = express();
const httpServer = createServer(app);
socket.createSocket(httpServer);

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.static(join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(apiQueryParams);
app.use('/api', routes);
app.all('*', (req, res) => {
  sendJsonRes(res, httpStatus.NOT_FOUND, {
    message: `Cannot find address ${req.originalUrl} on this server.`,
  });
});
app.use(handleError);

mongoose.connect(DB_URI).then(() => console.log('Database connected'));
httpServer.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

process.on('unhandledRejection', (reason, promise) => {
  console.log(reason, promise);
});

process.on('uncaughtException', (error) => {
  console.log(error);
  if (!error.isOperational) process.exit(1);
});
