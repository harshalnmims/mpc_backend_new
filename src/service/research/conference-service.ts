import { getLogger } from '$config/logger-context';
import {getConferenceModel, insertConferenceModel, updateConferencemodels, deleteConferenceModel,
    
 } from '$model/conference-model';
 import { paginationDefaultType } from 'types/db.default';
import {uploadFile} from '$middleware/fileupload.middleware';
import {renderModal,getNmimsAuthors,getAllAuthors,
   getSchool,getCampus
} from '$model/master-model';
import exp from 'constants';

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
    logger.info('INSIDE GET SUBJECT RESEARCH SERVICES');
 
    const data = await getConferenceModel({
       page,
       limit,
       sort,
       order,
       search,
       ...filters,
    });
 
    return data;
 }; 

export const renderConferenceListsService  = async() => {
    const nmimsAuthors = await getNmimsAuthors();
    const allAuthors = await getAllAuthors();
    const school = await getSchool();
    const campus = await getCampus();
    return {
     nmimsAuthors,allAuthors,school,campus
    };
    
 }
 


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
