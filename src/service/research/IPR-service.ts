import { getLogger } from '$config/logger-context';

import { insertIPRModel, updateIPRModel, deleteIPRModel, iprPaginateModel } from '$model/ipr-model';

import { IPRDetails }  from 'types/research.types';




import { paginationDefaultType } from 'types/db.default';

import { getSchool,getCampus,getEnternalFaculty, 
	getExternalFaculty, getSdgGoals, getInventionType, getPatentStatus

} from '$model/master-model';

import {uploadFile} from '$middleware/fileupload.middleware'

import { Request,Response } from 'express';

import { downloadFile } from '$middleware/fileupload.middleware';

import { string } from 'zod';










export const iprPaginateService = async ({

    page,

    limit,

    sort,

    order,

    search,

    ...filters

 }: paginationDefaultType) => {

    const logger = getLogger();

    logger.info('INSIDE GET SUBJECT RESEARCH SERVICES ');

 

    const data = await iprPaginateModel({

       page,

       limit,

       sort,

       order,

       search,

       ...filters,

    });

 

    return data;

 }; 






 export const iprRenderService = async () => {

    const logger = getLogger();

    

 

    const externalAuthors = await getExternalFaculty();

    const internalAuthors = await getEnternalFaculty();

    const school = await getSchool();

    const campus = await getCampus();

    const status = await getPatentStatus();

    const inventionType = await getInventionType();

    const sdgGoals = await getSdgGoals();

    

    return {

       school,campus, externalAuthors, internalAuthors, status, inventionType, sdgGoals

    };

  }

 






export const insertIPRService = async (iprDetails: IPRDetails) => {

    const logger = getLogger();

    logger.info('INSIDE IPR  SERVICES');

 

    const data = await insertIPRModel(iprDetails);

 

    return data;

}

export const updateIPRService = async (iprDetails: IPRDetails) => {

    const logger = getLogger();

    logger.info('UPDATE IPR SERVICES');

    const data = await updateIPRModel(iprDetails);




    return data;

}

export const deleteIPRService = async (iprId: number) => {

    const logger = getLogger();

    logger.info('DELETE IPR SERVICES');

    const data = await deleteIPRModel(iprId);

    return data;

}