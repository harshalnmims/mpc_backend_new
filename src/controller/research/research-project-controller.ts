import { getLogger } from '$config/logger-context';
import {
    getResearchProjectService, insertResearchProjectService, updateResearchProjectService,
    deleteResearchProjectService
   } from '$service/research/research-project-service';
import { Request, Response, NextFunction } from 'express';

export const getResearchProjectForm = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH PROJECT CONTROLLER');
 
    const {
       page = 1,
       limit = 10,
       sort = '',
       order = 'desc',
       search = '',
       ...filters
    } = { ...req.body, ...req.params, ...req.query };
 
    const data = await getResearchProjectService({
       page,
       limit,
       search,
       sort,
       order,
       filters,
    });
 
    return res.status(200).json(data);
};


export const insertResearchForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH PROJECT CONTROLLER');

    const researchData = {...req.body};
    let username = res.locals.username;

    const data = await insertResearchProjectService(researchData,username);

    console.log(' data response in case of insert controller ===>>>>', data);
    return res.status(200).json(data)

};


export const updateResearchForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH PROJECT CONTROLLER');

    const updateResearchData = {...req.body};
    let username = res.locals.username;

    const data = await updateResearchProjectService(updateResearchData,username);

    console.log(' data response in case of insert controller ===>>>>', data);
    return res.status(200).json(data)

};

export const deleteResearchForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET PATENT SUBMISSION AND GRANT CONTROLLER');

    const researchData = {...req.body};
    const researchprojectId = researchData.research_project_id;
    let username = res.locals.username;
    const data = await deleteResearchProjectService(researchprojectId,username);

    console.log(' data response in case of delete controller ===>>>>', data);

    return res.status(200).json(data)

}


