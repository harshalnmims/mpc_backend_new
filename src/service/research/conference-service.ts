import { getLogger } from '$config/logger-context';
import {getBookConference, insertConferenceModel, updateConferencemodels, deleteConferenceModel
 } from '$model/conference-model';
import exp from 'constants';
import { paginationDefaultType } from 'types/db.default';

import { conferenceDetails} from 'types/research.types';
import { number } from 'zod';

export const getConferenceService = async ({
    page,
    limit,
    sort,
    order,
    search,
    ...filters
 }: paginationDefaultType) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT CONFERENCE SERVICES');
 
    const data = await getBookConference({
       page,
       limit,
       sort,
       order,
       search,
       ...filters,
    });
 
    return data;
 };

export const insertConferenceService = async(conferenceData : conferenceDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');
    console.log('conferenceData in service ====>>>>>', conferenceData);
 
    const data = await insertConferenceModel(conferenceData);
 
    return data;

 }

export const updateConferenceService = async(updateConferenceData : conferenceDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');
    console.log('updateConferenceData in service ====>>>>>', updateConferenceData);
 
    const data = await updateConferencemodels(updateConferenceData);
 
    return data

}


export const deleteConferenceService = async(conferenceId : number) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');
    console.log('conferenceId in service ====>>>>>', conferenceId);
 
    const data = await deleteConferenceModel(conferenceId);
 
    return data

}
