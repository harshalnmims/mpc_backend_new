import { getLogger } from '$config/logger-context';
import { getpatentSubmission, insertPatentSubmissionModel, updatePatentSubmissionModel, 
    deletePatentSubmissionModel
 } from '$model/patent-submission-model';
import exp from 'constants';
import { paginationDefaultType } from 'types/db.default';

import { patentDetails} from 'types/research.types';
import { number } from 'zod';

export const getBookPatentService = async ({
    page,
    limit,
    sort,
    order,
    search,
    ...filters
 }: paginationDefaultType) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT RESEARCH SERVICES');
 
    const data = await getpatentSubmission({
       page,
       limit,
       sort,
       order,
       search,
       ...filters,
    });
 
    return data;
 };

 export const insertPatentSubmissionService = async (patentData : patentDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');
    console.log('patentData in service ====>>>>>', patentData);
 
    const data = await insertPatentSubmissionModel(patentData);
 
    return data;
 }

export const updatePatentSubmissionService = async (updatePatentData : patentDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET  PATENT SUBMISSION');
    console.log('patentData in service ====>>>>>', updatePatentData);
 
    const data = await updatePatentSubmissionModel(updatePatentData);
 
    return data;
}


export const deletePatentSubmissionService = async(patentId : number) => {
    const logger = getLogger();
    logger.info('INSIDE GET  PATENT SUBMISSION');
    console.log('patentId in service ====>>>>>', patentId);
 
    const data = await deletePatentSubmissionModel(patentId);
 
    return data;

};


