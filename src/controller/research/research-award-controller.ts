import { getLogger } from '$config/logger-context';
import {
    getResearchAwardService, insertResearchAwardService, updateResearchAwardService, 
    deleteResearchAwardService
   } from '$service/research/research-award-service';
import { Request, Response, NextFunction } from 'express';

export const getResearchAward = async (req: Request, res: Response, next: NextFunction) => {
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
 
    const data = await getResearchAwardService({
       page,
       limit,
       search,
       sort,
       order,
       filters,
    });
 
    return res.status(200).json(data);
}

export const insertResearchAwardForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH AWARD CONTROLLER');

    const researchAwardData = {...req.body};

    const data = await insertResearchAwardService(researchAwardData);

    console.log(' data response in case of insert controller ===>>>>', data);
    return res.status(200).json(data)

};

export const updateResearchAwardForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH AWARD CONTROLLER');

    const updateResearchAwardData = {...req.body};

    const data = await updateResearchAwardService(updateResearchAwardData);

    console.log(' data response in case of insert controller ===>>>>', data);
    return res.status(200).json(data)

};

export const deleteResearchAwardForm = async (req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH AWARD CONTROLLER');

    const researchAwardData = {...req.body};
    const awardId = researchAwardData.research_award_id;

    const data = await deleteResearchAwardService(awardId);

    console.log(' data response in case of insert controller ===>>>>', data);
    return res.status(200).json(data)

}