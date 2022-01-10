/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import routes from './routes';
import { handleError } from './middleware';
import { httpStatus } from './constants';
import { sendJsonRes } from './utils';

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);

app.all('*', (req, res) => {
  sendJsonRes(res, httpStatus.NOT_FOUND, {
    message: `Cannot find address ${req.originalUrl} on this server.`,
  });
});

app.use(handleError);

export default app;
