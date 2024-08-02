import { getLogger } from '$config/logger-context';
import { validateWithZod } from '$middleware/validation.middleware';
import {
    getResearchAwardService, insertResearchAwardService, updateResearchAwardService, 
    deleteResearchAwardService,researchAwardPaginateService,researchAwardRenderService,
    researchAwardViewService,researchAwardUpdViewService,researchAwardDownloadFileService
   } from '$service/research/research-award-service';
import { filesArraySchema, researchAwardDataObj } from '$validations/research.valid';
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

    let username = res.locals.username
 
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

export const researchAwardPaginateController = async (req: Request, res: Response, next: NextFunction) => {
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

    let username = res.locals.username

 
    const data = await researchAwardPaginateService({
       page,
       limit,
       search,
       sort,
       order,
       filters,
    },username);
 
    return res.status(200).json(data);
}

export const insertResearchAwardForm = async(req : Request, res : Response, next : NextFunction) => {
    

    let researchAwardData = JSON.parse(req.body.research_award);
    let data;
    let documents = req.files;
let username = res.locals.username;
    let result = validateWithZod(researchAwardDataObj,researchAwardData);
    let fileResult = validateWithZod(filesArraySchema, documents);
    if(fileResult.success && result.success){
     data = await insertResearchAwardService(researchAwardData,documents,username);
    }
    return res.status(200).json(data)

};

export const updateResearchAwardForm = async(req : Request, res : Response, next : NextFunction) => {
    

    let researchAwardData = JSON.parse(req.body.research_award);
    let researchAwardId = JSON.parse(req.body.research_award_id);
    let data;
    let documents = req.files;
    let username = res.locals.username;

    let result = validateWithZod(researchAwardDataObj,researchAwardData);
    let fileResult = validateWithZod(filesArraySchema, documents);
    if(fileResult.success && result.success){
     data = await updateResearchAwardService(researchAwardData,documents,researchAwardId,username);
    }
    return res.status(200).json(data)

};

export const deleteResearchAwardForm = async (req : Request, res : Response, next : NextFunction) => {
   
    const awardId = req.query.id;
    let username = res.locals.username;
    const data = await deleteResearchAwardService(Number(awardId),username);
   
    return res.status(200).json(data)

}

export const researchAwardRenderController = async (req : Request, res : Response, next : NextFunction) => {
   
    const data = await researchAwardRenderService();
    return res.status(200).json(data)

}

export const researchAwardViewController = async (req : Request, res : Response, next : NextFunction) => {
   
    let id = req.query.id;
    const data = await researchAwardViewService(Number(id));
    return res.status(200).json(data)

}

export const researchAwardUpdViewController = async (req : Request, res : Response, next : NextFunction) => {
   
    let id = req.query.id;
    const data = await researchAwardUpdViewService(Number(id));
    return res.status(200).json(data)

}

export const researchAwardDownloadFiles = async (req : Request, res : Response, next : NextFunction) => {
   
    let id = req.query.id;
    await researchAwardDownloadFileService(Number(id),req,res);

}