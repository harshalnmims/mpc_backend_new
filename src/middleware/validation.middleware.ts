import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError ,ZodSchema } from 'zod';
import { HTTP_STATUS } from '$constants/http.constant';
import { CustomError } from '$utils/error/customError';
import logger from '$config/logger';
import { invalidRequestError } from '$utils/error/error';
import * as z from 'zod';

// export const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
//    try {
//       console.log('journal validate json ');

//       await schema.parseAsync({
//            body: req.body,
//          // query: req.query,
//          // params: req.params,
//       });
//       // return next();
//    } catch (error) {
//       logger.error(error);
//       if (error instanceof ZodError) {
//          throw new CustomError({
//             moduleName: 'validate',
//             status: HTTP_STATUS.BAD_REQUEST,
//             message: error.issues[0].message,
//             error: error,
//             validationErrors: error.issues,
//          });
//       } else {
//          invalidRequestError('validate', 'Validation error');
//       }
//    }
// };



     type ValidationResult<T> =
     | {
           success: false;
           data: null;
           errors: { [K in keyof T]?: string };
       }
     | {
           success: true;
           data: T;
           errors: null;
       };
  
  export function validateWithZod<T extends ZodSchema<any>>(
     schema: T,
     data: unknown
  ): ValidationResult<z.infer<T>> {
     try {
        console.log('inside zod')
        const validatedData = schema.parse(data);
        return { success: true, data: validatedData, errors: null };
     } catch (error) {
        if (error instanceof ZodError) {
           const errorDetails: { [key: string]: string } = {};
           error.errors.forEach((err) => {
              const path = err.path.join('.');
              errorDetails[path] = err.message;
           });
           return {
              success: false,
              data: null,
              errors: errorDetails as { [K in keyof z.infer<T>]?: string }
           };
        }
        throw error; // Rethrow if it's not a ZodError
     }
  }
  