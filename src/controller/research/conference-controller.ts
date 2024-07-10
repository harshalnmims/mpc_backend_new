import { getLogger } from '$config/logger-context';
import {getConferenceService, renderConferenceListsService, insertConferenceService, updateConferenceService, deleteConferenceService
   } from '$service/research/conference-service'
import exp from 'constants';
import { Request, Response, NextFunction } from 'express';


export const getConference = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT RESEARCH CONTROLLER');
 
    const {
       page = 1,
       limit = 10,
       sort = '',
       order = 'desc',
       search = '',
       ...filters
    } = { ...req.body, ...req.params, ...req.query };
 
    const data = await getConferenceService({
       page,
       limit,
       search,
       sort,
       order,
       filters,
    });

    console.log('data in controller after render ===>>>>>>', data);
 
    return res.status(200).json(data);
 };



export const insertConferenceForm = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE insertBookChapterForm CONTROLLER');

    const conferenceData = { ...req.body};

    const data = await insertConferenceService(conferenceData);

    console.log('data response conference controller  ====>>>>>>', data);
 
    return res.status(200).json(data);

}

export const renderConferenceLists = async(req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    const data = await renderConferenceListsService();
    return res.status(200).json(data);
  }

export const updateConferenceForm = async  (req: Request, res: Response, next: NextFunction) =>{
    const logger = getLogger();
    logger.info('INSIDE updateConferenceForm CONTROLLER');

    const updateConferenceData = { ...req.body};

    const data = await updateConferenceService(updateConferenceData);

    console.log('data response conference update  controller  ====>>>>>>', data);
 
    return res.status(200).json(data);

}

export const deleteConferenceForm = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE updateConferenceForm CONTROLLER');

    const conferenceData = { ...req.body};
    const conferenceId = conferenceData.conference_id;

    const data = await deleteConferenceService(conferenceId);

    console.log('data response conference update  controller  ====>>>>>>', data);
 
    return res.status(200).json(data);

}