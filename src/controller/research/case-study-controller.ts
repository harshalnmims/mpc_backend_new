import { getLogger } from '$config/logger-context';
import {
    getCaseStudyService, insertCaseStudyService, updateCaseStudyService,
    deleteCaseStudyService
   } from '$service/research/case-study-service';
import { Request, Response, NextFunction } from 'express';

export const getCaseStudy = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET CASE STUDY CONTROLLER');
 
    const {
       page = 1,
       limit = 10,
       sort = '',
       order = 'desc',
       search = '',
       ...filters
    } = { ...req.body, ...req.params, ...req.query };
 
    const data = await getCaseStudyService({
       page,
       limit,
       search,
       sort,
       order,
       filters,
    });
 
    return res.status(200).json(data);
};

export const insertCaseStudyForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET CASE STUDY INSERT CONTROLLER');

    const caseStudyData = {...req.body};

    const data = await insertCaseStudyService(caseStudyData);

    console.log(' data response in case of insert controller ===>>>>', data);
    return res.status(200).json(data)

};

export const updateCaseStudyForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET CASE STUDY UPDATE CONTROLLER');

    const updateCaseStudyData = {...req.body};

    const data = await updateCaseStudyService(updateCaseStudyData);

    console.log(' data response in case of update controller ===>>>>', data);
    return res.status(200).json(data)

};

export const deleteCaseStudyForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET CASE STUDY UPDATE CONTROLLER');

    const caseStudyData = {...req.body};
    const caseStudyId = caseStudyData.case_study_id;

    const data = await deleteCaseStudyService(caseStudyId);

    console.log(' data response in case of delete controller ===>>>>', data);
    return res.status(200).json(data)

};