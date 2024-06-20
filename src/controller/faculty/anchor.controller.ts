import { getLogger } from '$config/logger-context';
import { getAttendessService, getCourseAnchorService, getProgramAnchorService } from '$service/faculty/anchor.service';
import { Request, Response, NextFunction } from 'express';

export const getCourseAnchor = async (req: Request, res: Response, next: NextFunction) => {
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

   const data = await getCourseAnchorService({
      page,
      limit,
      search,
      sort,
      order,
      filters,
   });

   return res.status(200).json(data);
};

export const getProgramAnchor = async (req: Request, res: Response, next: NextFunction) => {
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

   const data = await getProgramAnchorService({
      page,
      limit,
      search,
      sort,
      order,
      filters,
   });

   return res.status(200).json(data);
};
export const getAttendees = async (req: Request, res: Response, next: NextFunction) => {
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

   const data = await getAttendessService({
      page,
      limit,
      search,
      sort,
      order,
      filters,
   });

   return res.status(200).json(data);
};
