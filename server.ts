import express, { Express } from 'express';
import cors from 'cors';
import { addChildLogger, requestLogger } from '$middleware/logger.middleware';
import { customErrorHandler } from '$middleware/error.middleware';
import logger from '$config/logger';
import { addSessionUserToRequest } from '$middleware/index.middleware';
import router from '$routes/index';
import { main } from 'kafka';
import dotenv from 'dotenv'; 
import cookieParser from 'cookie-parser';
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(
   express.json({
      limit: '200mb',
   }),
);
app.use(express.urlencoded({ extended: true }));

app.use(
   cors({
      origin: true,
      credentials: true,
   }),
);

app.use(cookieParser(process.env.COOKIE_SECRET));


process.env.NODE_ENV === 'production' &&
   main()
      .then(() => logger.info('Kafka connected Successfully'))
      .catch(logger.error);

app.use(requestLogger);
app.use(addChildLogger);

app.use('/research', addSessionUserToRequest, router);

app.use(customErrorHandler);

app.listen(PORT, () => {
   logger.info(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
