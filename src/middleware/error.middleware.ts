import logger from '$config/logger';
import { CustomError } from '$utils/error/customError';
import { NextFunction, Request, Response } from 'express';

export const customErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
   logger.error(err);

   if (err instanceof CustomError) {
      return res.status(err.httpStatus).json({
         message: err.message,
         status: err.status,
         code: err.httpStatus,
         validationErrors: err.validationErrors,
         errorId: crypto.randomUUID(),
      });
   } else {
      // Provide more details in the response during development
      const errorResponse =
         process.env.NODE_ENV === 'production'
            ? { message: 'Internal Server Error', status: 500, errorId: crypto.randomUUID() }
            : { message: err.message, status: 500, stack: err.stack, errorId: crypto.randomUUID() };

      return res.status(500).json(errorResponse);
   }
};

// Custom async error handler middleware
export const asyncErrorHandler =
   (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
   (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
   };


