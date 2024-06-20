import logger from '$config/logger';
import { runWithLogger } from '$config/logger-context';
import { NextFunction, Request, Response } from 'express';
import expressWinston from 'express-winston';

export const requestLogger = expressWinston.logger({
   winstonInstance: logger,
   meta: true, // Log metadata such as req.url, req.method, etc.
   msg: 'HTTP {{req.method}} {{req.url}}',
   expressFormat: true,
   colorize: true, // Disable colorization if you want plain text logs
   dynamicMeta: (req: Request, res: Response) => {
      return {
         requestId: res.locals.requestId,
      };
   },
});

export const addChildLogger = (req: Request, res: Response, next: NextFunction) => {
   const childLogger = logger.child({
      requestId: req.headers['x-request-id'] as string,
   });
   runWithLogger(childLogger, () => {
      res.locals.requestId = res.locals.requestId;
      res.locals.logger = childLogger;
      next();
   });
};
