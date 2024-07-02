import { getLogger } from '$config/logger-context';
import {
    getMeetingStackholdersService, insertMeetingStackholdersService,
    updateMeetingStackholdersService, deleteMeetingStackholdersService
   } from '$service/research/meeting-stackholders-service';
import { Request, Response, NextFunction } from 'express';

export const getMeetingStackholders = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET TEACHING EXECELLANCE  CONTROLLER');
 
    const {
       page = 1,
       limit = 10,
       sort = '',
       order = 'desc',
       search = '',
       ...filters
    } = { ...req.body, ...req.params, ...req.query };
 
    const data = await getMeetingStackholdersService({
       page,
       limit,
       search,
       sort,
       order,
       filters,
    });
 
    return res.status(200).json(data);
};

export const insertMeetingStackholdersForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET TEACHING EXCELLANCE CONTROLLER');

    const meetingData = {...req.body};

    const data = await insertMeetingStackholdersService(meetingData);

    console.log(' data response in case of insert controller ===>>>>', data);
    return res.status(200).json(data)

};

export const updateMeetingStackholdersForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET TEACHING EXCELLANCE CONTROLLER');

    const updateMeetingData = {...req.body};

    const data = await updateMeetingStackholdersService(updateMeetingData);

    console.log(' data response in case of insert controller ===>>>>', data);
    return res.status(200).json(data)

};


export const deleteMeetingStackholdersForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH SEMINAR CONTROLLER Update');

    const meetingData = {...req.body};
    const meetingId = meetingData.meeting_stackholders_id;

    const data = await deleteMeetingStackholdersService(meetingId);

    console.log(' data response in case of delete controller ===>>>>', data);
    return res.status(200).json(data)
}
