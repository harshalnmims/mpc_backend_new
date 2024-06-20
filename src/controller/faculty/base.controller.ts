import { getLogger } from '$config/logger-context';
import {
   getCampusService,
   getProgramsService,
   getSessionService,
   getSubjectService,
} from '$service/faculty/base.service';
import { Request, Response, NextFunction } from 'express';

export const getPrograms = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   logger.info('INSIDE GET PROGRAMS FACULTY CONTROLLER');

   const {
      page = 1,
      limit = 10,
      sort = '',
      order = 'desc',
      search = '',
      ...filters
   } = { ...req.body, ...req.params, ...req.query };

   const data = await getProgramsService({
      page,
      limit,
      search,
      sort,
      order,
      filters,
   });

   return res.status(200).json(data);
};
                        
export const getCampus = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   logger.info('INSIDE GET CAMPUS FACULTY CONTROLLER');

   const {
      page = 1,
      limit = 10,
      sort = '',
      order = 'desc',
      search = '',
      ...filters
   } = { ...req.body, ...req.params, ...req.query };

   const data = await getCampusService({
      page,
      limit,
      search,
      sort,
      order,
      filters,
   });

   return res.status(200).json(data);
};

export const getSession = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   logger.info('INSIDE GET SESSION FACULTY CONTROLLER');

   const {
      page = 1,
      limit = 10,
      sort = '',
      order = 'desc',
      search = '',
      ...filters
   } = { ...req.body, ...req.params, ...req.query };

   const data = await getSessionService({
      page,
      limit,
      search,
      sort,
      order,
      filters,
   });

   return res.status(200).json(data);
};

export const getSubject = async (req: Request, res: Response, next: NextFunction) => {
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

   const data = await getSubjectService({
      page,
      limit,
      search,
      sort,
      order,
      filters,
   });

   return res.status(200).json(data);
};
