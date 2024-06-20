import { ZodIssue } from 'zod';
import { HTTP_STATUS } from '$constants/http.constant';

export type ErrorObject = {
   message: string;
   moduleName: string;
   status: HTTP_STATUS;
   httpStatus?: (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];
   error?: any;
   validationErrors?: ZodIssue[];
};
