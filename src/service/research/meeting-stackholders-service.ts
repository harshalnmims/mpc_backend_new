import { getLogger } from '$config/logger-context';
import { getMeetingStackholdersModel, insertMeetingStackholdersModel,
    updateMeetingStackholdersModel, deleteMeetingStackholdersModel
 } from '$model/meeting-stackholders-model';
import exp from 'constants';
import { paginationDefaultType } from 'types/db.default';

import { meetingDetails} from 'types/research.types';
import { number } from 'zod'; 

export const getMeetingStackholdersService = async ({
    page,
    limit,
    sort,
    order,
    search,
    ...filters
 }: paginationDefaultType) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT RESEARCH SERVICES');
 
    const data = await getMeetingStackholdersModel({
       page,
       limit,
       sort,
       order,
       search,
       ...filters,
    });
 
    return data;
 };

export const insertMeetingStackholdersService = async (meetingData : meetingDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET MEETING STACKHOLDERS SERVICES');
    console.log('meetingData in service ====>>>>>', meetingData);
 
    const data = await insertMeetingStackholdersModel(meetingData);
 
    return data;
 };

export const updateMeetingStackholdersService = async (updateMeetingData : meetingDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET MEETING STACKHOLDERS UPDATE SERVICES');
    console.log('updateMeetingData in service ====>>>>>', updateMeetingData);
 
    const data = await updateMeetingStackholdersModel(updateMeetingData);
 
    return data;
 };

export const deleteMeetingStackholdersService = async (meetingId : number) => {
    const logger = getLogger();
    logger.info('INSIDE GET MEETING STACKHOLDERS DELETE SERVICES');
    console.log('meetingId in service ====>>>>>', meetingId);
 
    const data = await deleteMeetingStackholdersModel(meetingId);
 
    return data;
 };


