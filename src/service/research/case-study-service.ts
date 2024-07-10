import { getLogger } from '$config/logger-context';
import {getCaseStudyModel, insertCaseStudyModel, updateCaseStudyModel ,
    deleteCaseStudyModel
 } from '$model/case-study-model';
import exp from 'constants';
import { paginationDefaultType } from 'types/db.default';

import { caseStudyDetails} from 'types/research.types';
import { number } from 'zod'; 

export const getCaseStudyService = async ({
    page,
    limit,
    sort,
    order,
    search,
    ...filters
 }: paginationDefaultType) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT CASE STUDY SERVICES');
 
    const data = await getCaseStudyModel({
       page,
       limit,
       sort,
       order,
       search,
       ...filters,
    });
 
    return data;
 };

export const insertCaseStudyService = async (caseStudyData : caseStudyDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH case study insert  SERVICES');
    console.log('caseStudyData in service ====>>>>>', caseStudyData);
 
    const data = await insertCaseStudyModel(caseStudyData);
 
    return data;
 };

export const updateCaseStudyService = async (updateCaseStudyData : caseStudyDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH case study update  SERVICES');
    console.log('updateCaseStudyData in service ====>>>>>', updateCaseStudyData);
 
    const data = await updateCaseStudyModel(updateCaseStudyData);
 
    return data;
 };

 export const deleteCaseStudyService = async (caseStudyId : number) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH case study DELETE  SERVICES');
    console.log('updateCaseStudyData in service ====>>>>>', caseStudyId);
 
    const data = await deleteCaseStudyModel(caseStudyId);
 
    return data;
 };