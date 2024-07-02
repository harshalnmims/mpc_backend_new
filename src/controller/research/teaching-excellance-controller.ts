import { getLogger } from '$config/logger-context';
import {
    getTeachingService, insertTeachingService, updateTeachingService,
    deleteTeachingService
   } from '$service/research/teaching-excellance-service';
import { Request, Response, NextFunction } from 'express';

export const getTeachingExecellance = async (req: Request, res: Response, next: NextFunction) => {
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
 
    const data = await getTeachingService({
       page,
       limit,
       search,
       sort,
       order,
       filters,
    });
 
    return res.status(200).json(data);
};

export const insertTeachingForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET TEACHING EXCELLANCE CONTROLLER');

    const teachinngData = {...req.body};

    const data = await insertTeachingService(teachinngData);

    console.log(' data response in case of insert controller ===>>>>', data);
    return res.status(200).json(data)

};

export const updateTeachingForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET TEACHING EXCELLANCE CONTROLLER');

    const updateTeachinngData = {...req.body};

    const data = await updateTeachingService(updateTeachinngData);

    console.log(' data response in case of insert controller ===>>>>', data);
    return res.status(200).json(data)

};

export const deleteTeachingForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH SEMINAR CONTROLLER Update');

    const teachingData = {...req.body};
    const teachingId = teachingData.teaching_excellance_id;

    const data = await deleteTeachingService(teachingId);

    console.log(' data response in case of delete controller ===>>>>', data);
    return res.status(200).json(data)
}