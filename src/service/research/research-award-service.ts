import { getLogger } from '$config/logger-context';
import { getResearchAwardModel, insertResearchAwardModel, updateResearchAwardModel, 
    deleteResearchAwardModel
 } from '$model/research-award-model';
import exp from 'constants';
import { paginationDefaultType } from 'types/db.default';

import { researchAwardDetails} from 'types/research.types';
import { number } from 'zod'; 

export const getResearchAwardService = async ({
    page,
    limit,
    sort,
    order,
    search,
    ...filters
 }: paginationDefaultType) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT RESEARCH SERVICES');
 
    const data = await getResearchAwardModel({
       page,
       limit,
       sort,
       order,
       search,
       ...filters,
    });
 
    return data;
 };

export const insertResearchAwardService = async (researchAwardData : researchAwardDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH PROJECT  SERVICES');
    console.log('researchAwardData in service ====>>>>>', researchAwardData);
 
    const data = await insertResearchAwardModel(researchAwardData);
 
    return data;
 };

export const updateResearchAwardService = async (updateResearchAwardData : researchAwardDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH PROJECT  SERVICES');
    console.log('updateResearchAwardData in service ====>>>>>', updateResearchAwardData);
 
    const data = await updateResearchAwardModel(updateResearchAwardData);
 
    return data;
 };

export const deleteResearchAwardService = async(awardId : number) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH AWARD  SERVICES');
    console.log('awardId ===>>>>', awardId);

    const data = await deleteResearchAwardModel(awardId);
    
    return data;
}