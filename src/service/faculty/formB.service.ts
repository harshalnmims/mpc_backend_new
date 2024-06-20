import { getLogger } from '$config/logger-context';
import { submitFormBModel, updateFormBModel, viewFormBModel } from '$model/form_b.model';
import { paginationDefaultType } from 'types/db.default';

export const submitFormBService = async (FormBJson: any) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY SERVICES');

   const data = await submitFormBModel(FormBJson);

   return data;
};
export const viewFormBService = async ({ page, limit, sort, order, search, ...filters }: paginationDefaultType) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY SERVICES');

   const data = await viewFormBModel({
      page,
      limit,
      sort,
      order,
      search,
      ...filters,
   });

   return data;
};
export const updateFormBService = async ({ page, limit, sort, order, search, ...filters }: paginationDefaultType) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY SERVICES');

   const data = await updateFormBModel({
      page,
      limit,
      sort,
      order,
      search,
      ...filters,
   });

   return data;
};
