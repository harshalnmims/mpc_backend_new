import { getLogger } from '$config/logger-context';
import { getResearchSeminarModel, insertResearchSeminarModel, updateResearchSeminarModel,
     deleteResearchSeminarModel
 } from '$model/research-seminar-model';
import exp from 'constants';
import { paginationDefaultType } from 'types/db.default';

import { seminarDetails} from 'types/research.types';
import { number } from 'zod'; 

export const getResearchSeminarService = async ({
    page,
    limit,
    sort,
    order,
    search,
    ...filters
 }: paginationDefaultType) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT RESEARCH SERVICES');
 
    const data = await getResearchSeminarModel({
       page,
       limit,
       sort,
       order,
       search,
       ...filters,
    });
 
    return data;
 };

export const insertResearchSeminarService = async (researchSeminarData : seminarDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH SEMINAR  SERVICES');
    console.log('researchSeminarData in service ====>>>>>', researchSeminarData);
 
    const data = await insertResearchSeminarModel(researchSeminarData);
 
    return data;
 };


 export const updateResearchSeminarService = async (updateResearchSeminarData : seminarDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH SEMINAR  SERVICES');
    console.log('updateResearchSeminarData in service ====>>>>>', updateResearchSeminarData);
 
    const data = await updateResearchSeminarModel(updateResearchSeminarData);
 
    return data;
 };

 export const deleteResearchSeminalService = async(seminarId: number) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH SEMINAR');
    console.log('seminarId in service ====>>>>>', seminarId);
 
    const data = await deleteResearchSeminarModel(seminarId);
 
    return data;
 }