import { getLogger } from '$config/logger-context';
import { submitFormBService, updateFormBService, viewFormBService } from '$service/faculty/formB.service';
import { Request, Response, NextFunction } from 'express';

export const submitFormB = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY CONTROLLER');

   const formBJson = { ...req.body, ...req.params, ...req.query };

   const data = await submitFormBService(formBJson);

   return res.status(200).json(data);
};
export const viewFormB = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY CONTROLLER');

   const {
      page = 1,
      limit = 10,
      sort = '',
      order = 'desc',
      search = '',
      ...filters
   } = { ...req.body, ...req.params, ...req.query };

   const data = await viewFormBService({
      page,
      limit,
      search,
      sort,
      order,
      filters,
   });

   return res.status(200).json(data);
};
export const updateFormB = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY CONTROLLER');

   const {
      page = 1,
      limit = 10,
      sort = '',
      order = 'desc',
      search = '',
      ...filters
   } = { ...req.body, ...req.params, ...req.query };

   const data = await updateFormBService({
      page,
      limit,
      search,
      sort,
      order,
      filters,
   });

   return res.status(200).json(data);
};
