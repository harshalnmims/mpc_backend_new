import { getLogger } from '$config/logger-context';
import { validateWithZod } from '$middleware/validation.middleware';
import {
    getResearchSeminarService, insertResearchSeminarService, updateResearchSeminarService,
    deleteResearchSeminalService,ResearchSeminarPaginateService,researchSeminarRenderService,
    researchSeminarViewService,researchSeminarUpdateViewService,researchSeminarDownloadFileService
   } from '$service/research/research-seminar-service';
import { filesArraySchema, researchSeminarObj } from '$validations/research.valid';
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
    let researchSeminarDetails = JSON.parse(req.body.research_seminar);
    let data;
    let documents = req.files;

    let result = validateWithZod(researchSeminarObj,researchSeminarDetails);
    let fileResult = validateWithZod(filesArraySchema, documents);

    if(fileResult.success && result.success){
     data = await insertResearchSeminarService(researchSeminarDetails,documents);
    }
    return res.status(200).json(data);

};


export const updateResearchSeminarForm = async(req : Request, res : Response, next : NextFunction) => {
    
    let researchSeminarDetails = JSON.parse(req.body.research_seminar);
    let seminarId = JSON.parse(req.body.research_seminar_id);
    let data;
    let documents = req.files;

    let result = validateWithZod(researchSeminarObj,researchSeminarDetails);
    let fileResult = validateWithZod(filesArraySchema, documents);

    if(fileResult.success && result.success){
     data = await updateResearchSeminarService(researchSeminarDetails,documents,Number(seminarId));
    }

    console.log(' data response in case of insert controller ===>>>>', data);
    return res.status(200).json(data)

};

export const deleteResearchSeminarForm = async(req : Request, res : Response, next : NextFunction) => {

    const seminarId = req.query.id;

    const data = await deleteResearchSeminalService(Number(seminarId));
    return res.status(200).json(data)
}

export const researchSeminarRenderController  = async(req : Request, res : Response, next : NextFunction) => {
   
    const data = await researchSeminarRenderService();
    return res.status(200).json(data)
}

export const researchSeminarViewController = async(req : Request, res : Response, next : NextFunction) => {
    let id = req.query.id;
    const data = await researchSeminarViewService(Number(id));
    return res.status(200).json(data)
}

export const researchSeminarUpdateViewCtrl  = async(req : Request, res : Response, next : NextFunction) => {
    let id = req.query.id;
    const data = await researchSeminarUpdateViewService(Number(id));
    return res.status(200).json(data)
}

export const researchSeminarFilesCtrl = async(req : Request, res : Response, next : NextFunction) => {
    const id = req.query.id;
   console.log('id ',id)

    await researchSeminarDownloadFileService(Number(id),req,res);
}