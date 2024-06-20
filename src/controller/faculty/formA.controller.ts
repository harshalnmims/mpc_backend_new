import { getLogger } from '$config/logger-context';
import { submitFormAService, updateFormAService, viewFormAService } from '$service/faculty/formA.service';
import { Request, Response, NextFunction } from 'express';

export const submitFormA = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY CONTROLLER');

   const FormAJson = { ...req.body, ...req.params, ...req.query };
   const data = await submitFormAService(FormAJson);

   return res.status(200).json(data);
};

export const viewFormA = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY CONTROLLER');

   const { meetingId = 0 } = { ...req.body, ...req.params, ...req.query };

   const data = await viewFormAService(meetingId);

   return res.status(200).json(data);
};

export const updateFormA = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY CONTROLLER');

   const FormAJson = { ...req.body, ...req.params, ...req.query };

   const data = await updateFormAService(FormAJson);

   return res.status(200).json(data);
};
