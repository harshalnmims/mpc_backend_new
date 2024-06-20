import { getLogger } from '$config/logger-context';
import { getAcadSessionModel, getCampusModel, getProgramsModel, getSubjectModel } from '$model/base.model';
import { paginationDefaultType } from 'types/db.default';

export const getProgramsService = async ({ page, limit, sort, order, search, ...filters }: paginationDefaultType) => {
   const logger = getLogger();
   logger.info('INSIDE GET PROGRAMS FACULTY SERVICES');

   const data = await getProgramsModel({
      page,
      limit,
      sort,
      order,
      search,
      ...filters,
   });

   return data;
};

export const getCampusService = async ({ page, limit, sort, order, search, ...filters }: paginationDefaultType) => {
   const logger = getLogger();
   logger.info('INSIDE GET CAMPUS FACULTY SERVICES');

   const data = await getCampusModel({
      page,
      limit,
      sort,
      order,
      search,
      ...filters,
   });

   return data;
};

export const getSessionService = async ({ page, limit, sort, order, search, ...filters }: paginationDefaultType) => {
   const logger = getLogger();
   logger.info('INSIDE GET SESSION FACULTY SERVICES');

   const data = await getAcadSessionModel({
      page,
      limit,
      sort,
      order,
      search,
      ...filters,
   });

   return data;
};

export const getSubjectService = async ({ page, limit, sort, order, search, ...filters }: paginationDefaultType) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY SERVICES');

   const data = await getSubjectModel({
      page,
      limit,
      sort,
      order,
      search,
      ...filters,
   });

   return data;
};
