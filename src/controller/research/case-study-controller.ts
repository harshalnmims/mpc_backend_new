import { getLogger } from '$config/logger-context';
import { validateWithZod } from '$middleware/validation.middleware';
import {
    getCaseStudyService, insertCaseStudyService, updateCaseStudyService,
    deleteCaseStudyService,CaseStudyPaginateService,CaseStudyRenderService,CaseStudyViewService,
    CaseStudyUpdateViewService,caseStudyDownloadFileService
   } from '$service/research/case-study-service';
import { caseStudy, filesArraySchema } from '$validations/research.valid';
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


export const CaseStudyPaginateController = async (req: Request, res: Response, next: NextFunction) => {
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
 
    const data = await CaseStudyPaginateService({
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

    const caseStudyData = JSON.parse(req.body.case_study);
    let data;
    let documents = req.files;
    
     let result = validateWithZod(caseStudy,caseStudyData);
     let fileResult = validateWithZod(filesArraySchema, documents);

     if(fileResult.success && result.success){
      data = await insertCaseStudyService(caseStudyData,documents);
     }
     return res.status(200).json(data);

};

export const updateCaseStudyForm = async(req : Request, res : Response, next : NextFunction) => {
   const caseStudyData = JSON.parse(req.body.case_study);
   const caseStudyId =  JSON.parse(req.body.case_study_id);
    let data;
    let documents = req.files;
    
     let result = validateWithZod(caseStudy,caseStudyData);
     let fileResult = validateWithZod(filesArraySchema, documents);

     if(fileResult.success && result.success){
      data = await updateCaseStudyService(caseStudyData,documents,Number(caseStudyId));
     }
     return res.status(200).json(data);

};

export const deleteCaseStudyForm = async(req : Request, res : Response, next : NextFunction) => {
    
    const caseStudyId = req.query.id;

    const data = await deleteCaseStudyService(Number(caseStudyId));

    console.log(' data response in case of delete controller ===>>>>', data);
    return res.status(200).json(data)

};

export const CaseStudyRenderController = async (req : Request, res : Response, next : NextFunction) => {

    const data = await CaseStudyRenderService();
    return res.status(200).json(data)

};

export const CaseStudyViewController = async (req : Request, res : Response, next : NextFunction) => {

    const id = req.query.id;
    const data = await CaseStudyViewService(Number(id));
    return res.status(200).json(data)

};

export const CaseStudyUpdateViewController = async (req : Request, res : Response, next : NextFunction) => {

    const id = req.query.id;
    const data = await CaseStudyUpdateViewService(Number(id));
    return res.status(200).json(data)

};

export const downloadFilesController = async (req : Request , res : Response , next  : NextFunction) => {
    const id = req.query.id;
    console.log('id ',id)
 
     await caseStudyDownloadFileService(Number(id),req,res);
  
  }