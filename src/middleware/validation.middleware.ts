import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { HTTP_STATUS } from '$constants/http.constant';
import { CustomError } from '$utils/error/customError';
import logger from '$config/logger';
import { invalidRequestError } from '$utils/error/error';

export const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
   try {


      await schema.parseAsync({
         body: req.body,
         query: req.query,
         params: req.params,
      });
      return next();
   } catch (error) {
      logger.error(error);
      if (error instanceof ZodError) {
         throw new CustomError({
            moduleName: 'validate',
            status: HTTP_STATUS.BAD_REQUEST,
            message: error.issues[0].message,
            error: error,
            validationErrors: error.issues,
         });
      } else {
         invalidRequestError('validate', 'Validation error');
      }
   }
};
