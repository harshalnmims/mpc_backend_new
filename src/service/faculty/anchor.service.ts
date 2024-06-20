import { getLogger } from '$config/logger-context';
import { getAttendeesModel, getCourseAnchorModel, getProgramAnchorModel } from '$model/anchors.model';
import { paginationDefaultType } from 'types/db.default';

export const getCourseAnchorService = async ({
   page,
   limit,
   sort,
   order,
   search,
   ...filters
}: paginationDefaultType) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY SERVICES');

   const data = await getCourseAnchorModel({
      page,
      limit,
      sort,
      order,
      search,
      ...filters,
   });

   return data;
};

export const getProgramAnchorService = async ({
   page,
   limit,
   sort,
   order,
   search,
   ...filters
}: paginationDefaultType) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY SERVICES');

   const data = await getProgramAnchorModel({
      page,
      limit,
      sort,
      order,
      search,
      ...filters,
   });

   return data;
};

export const getAttendessService = async ({ page, limit, sort, order, search, ...filters }: paginationDefaultType) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY SERVICES');

   const data = await getAttendeesModel({
      page,
      limit,
      sort,
      order,
      search,
      ...filters,
   });

   return data;
};
