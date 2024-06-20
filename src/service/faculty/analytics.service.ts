import { getLogger } from '$config/logger-context';
import {
   analyticsAllProgramsByIdModal,
   analyticsAllProgramsModal,
   campusByProgramModal,
   schoolListModal,
   subjectListByProgramAndYearModal,
} from '$model/analytics.model';

export const analyticsAllProgramsService = async (acad_year: string) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY SERVICES');

   const data = await analyticsAllProgramsModal(acad_year);
   return data;
};

export const analyticsAllProgramsByIdService = async (programId: number) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY SERVICES');

   const data = await analyticsAllProgramsByIdModal(programId);
   return data;
};

export const schoolListService = async (user_lid: number) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT FACULTY SERVICES');
 
    const data = await schoolListModal(user_lid);
    return data;
 };

export const subjectListByProgramAndYearService = async (programId: number, acad_year: string) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY SERVICES');

   const data = await subjectListByProgramAndYearModal(programId, acad_year);
   return data;
};

export const campusByProgramService = async (programId: number) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT FACULTY SERVICES');
 
    const data = await campusByProgramModal(programId);
    return data;
 };
