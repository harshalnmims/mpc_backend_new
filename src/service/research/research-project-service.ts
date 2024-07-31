import { getLogger } from '$config/logger-context';
import { getResearchProjectModel, insertResearchProjectModel, updateResearchProjectModel, 
    deleteResearchProjectModel
 } from '$model/research-project-model';
import exp from 'constants';
import { paginationDefaultType } from 'types/db.default';
import { researchProjectDetails} from 'types/research.types';
import { number } from 'zod';

export const getResearchProjectService = async ({
    page,
    limit,
    sort,
    order,
    search,
    ...filters
 }: paginationDefaultType) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT RESEARCH SERVICES');
 
    const data = await getResearchProjectModel({
       page,
       limit,
       sort,
       order,
       search,
       ...filters,
    });
 
    return data;
 };

export const insertResearchProjectService = async (researchData : researchProjectDetails,username:string) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH PROJECT  SERVICES');
    console.log('researchData in service ====>>>>>', researchData);
 
    const data = await insertResearchProjectModel(researchData,username);
 
    return data;
 };


export const updateResearchProjectService = async (updateResearchData : researchProjectDetails,username:string) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH PROJECT  SERVICES');
    console.log('updateResearchData in service ====>>>>>', updateResearchData);
 
    const data = await updateResearchProjectModel(updateResearchData,username);
 
    return data;
 };

export const deleteResearchProjectService = async(researchprojectId : number,username:string) => {
    const logger = getLogger();
    logger.info('INSIDE GET  PATENT SUBMISSION');
    console.log('researchprojectId in service ====>>>>>', researchprojectId);
 
    const data = await deleteResearchProjectModel(researchprojectId,username);
 
    return data;

};
