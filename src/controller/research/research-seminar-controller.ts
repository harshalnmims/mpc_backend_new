import { getLogger } from '$config/logger-context';
import {
    getResearchSeminarService, insertResearchSeminarService, updateResearchSeminarService,
    deleteResearchSeminalService,ResearchSeminarPaginateService
   } from '$service/research/research-seminar-service';
import { Request, Response, NextFunction } from 'express';

export const getResearchSeminar = async (req: Request, res: Response, next: NextFunction) => {
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
 
    const data = await getResearchSeminarService({
       page,
       limit,
       search,
       sort,
       order,
       filters,
    });
 
    return res.status(200).json(data);
};

export const researchSeminarPaginate = async (req: Request, res: Response, next: NextFunction) => {
   
    const {
       page = 1,
       limit = 10,
       sort = '',
       order = 'desc',
       search = '',
       ...filters
    } = { ...req.body, ...req.params, ...req.query };
 
    const data = await ResearchSeminarPaginateService({
       page,
       limit,
       search,
       sort,
       order,
       filters,
    });
 
    return res.status(200).json(data);
};

export const insertResearchSeminarForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH AWARD CONTROLLER');

    const researchSeminarData = {...req.body};

    const data = await insertResearchSeminarService(researchSeminarData);

    console.log(' data response in case of insert controller ===>>>>', data);
    return res.status(200).json(data)

};


export const updateResearchSeminarForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH SEMINAR CONTROLLER');

    const updateResearchSeminarData = {...req.body};

    const data = await updateResearchSeminarService(updateResearchSeminarData);

    console.log(' data response in case of insert controller ===>>>>', data);
    return res.status(200).json(data)

};

export const deleteResearchSeminarForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH SEMINAR CONTROLLER Update');

    const researchSeminarData = {...req.body};
    const seminarId = researchSeminarData.research_seminar_id;

    const data = await deleteResearchSeminalService(seminarId);

    console.log(' data response in case of delete controller ===>>>>', data);
    return res.status(200).json(data)
}