import { getLogger } from '$config/logger-context';
import {
    getBookPatentService, insertPatentSubmissionService, updatePatentSubmissionService,
    deletePatentSubmissionService
   } from '$service/research/patent-submission-service';
import { Request, Response, NextFunction } from 'express';

export const getpatentSubmissionData = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET PATENT SUBMISSION AND GRANT CONTROLLER');
 
    const {
       page = 1,
       limit = 10,
       sort = '',
       order = 'desc',
       search = '',
       ...filters
    } = { ...req.body, ...req.params, ...req.query };
 
    const data = await getBookPatentService({
       page,
       limit,
       search,
       sort,
       order,
       filters,
    });
 
    return res.status(200).json(data);
}

export const insertPatentSubmissionForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET PATENT SUBMISSION AND GRANT CONTROLLER');

    const patentData = {...req.body};

    const data = await insertPatentSubmissionService(patentData);

    console.log(' data response in case of insert controller ===>>>>', data);
    return res.status(200).json(data)

}

export const updatePatentSubmissionForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET PATENT SUBMISSION AND GRANT CONTROLLER');

    const updatePatentData = {...req.body};

    const data = await updatePatentSubmissionService(updatePatentData);

    console.log(' data response in case of update controller ===>>>>', data);
    return res.status(200).json(data)

}

export const deletePatentSubmissionForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET PATENT SUBMISSION AND GRANT CONTROLLER');

    const patentData = {...req.body};
    const patentId = patentData.patent_id;

    const data = await deletePatentSubmissionService(patentId);

    console.log(' data response in case of delete controller ===>>>>', data);

    return res.status(200).json(data)

}