import { getLogger } from '$config/logger-context';
import { getTeachingModel, insertTeachingModel, updateTeachingModel, deleteTeachingModel
 } from '$model/teaching-excellance-model';
import exp from 'constants';
import { paginationDefaultType } from 'types/db.default';

import { teachingDetails} from 'types/research.types';
import { number } from 'zod'; 

export const getTeachingService = async ({
    page,
    limit,
    sort,
    order,
    search,
    ...filters
 }: paginationDefaultType) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT RESEARCH SERVICES');
 
    const data = await getTeachingModel({
       page,
       limit,
       sort,
       order,
       search,
       ...filters,
    });
 
    return data;
 };

export const insertTeachingService = async (teachinngData : teachingDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET TEACHING EXECELLANCE  SERVICES');
    console.log('teachinngData in service ====>>>>>', teachinngData);
 
    const data = await insertTeachingModel(teachinngData);
 
    return data;
 };

export const updateTeachingService = async (updateTeachinngData : teachingDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET TEACHING EXECELLANCE update  SERVICES');
    console.log('updateTeachinngData in service ====>>>>>', updateTeachinngData);
 
    const data = await updateTeachingModel(updateTeachinngData);
 
    return data;
 };

export const deleteTeachingService = async(teachingId: number) => {
    const logger = getLogger();
    logger.info('INSIDE GET TEACHING EXCELLANCE SERVICE DELETE');
    console.log('teachingId in service ====>>>>>', teachingId);
 
    const data = await deleteTeachingModel(teachingId);
 
    return data;
 }

