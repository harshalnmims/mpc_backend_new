import { getLogger } from '$config/logger-context';
import {
    getTeachingPaginateService,
    updateViewService
   } from '$service/research/teaching.service';
import { Request, Response, NextFunction } from 'express';
import { validateWithZod } from '$middleware/validation.middleware';
import { filesArraySchema , teachingItemsSchema } from '$validations/research.valid';
import {insertTeachingService,deleteTeachingService,updateTeachingService} from '$service/research/teaching.service';

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

 const data = await getTeachingPaginateService({
     page ,
     limit,
     search,  
     sort,
     order,
     filters,
  });

  return res.status(200).json(data); 
}


export const insertTeachingController = async (req : Request ,res : Response ,next : NextFunction) => {
     let data;
     let files = req.files;
     let teaching_json = JSON.parse(req.body.teaching_excellance);

     let result = validateWithZod(teachingItemsSchema,teaching_json);
     let fileResult = validateWithZod(filesArraySchema, files);

     if(fileResult.success && result.success){
       data = await insertTeachingService(teaching_json,files);
      }
         
     return res.status(200).json(data); 

}

export const updateTeachingController = async (req : Request ,res : Response ,next : NextFunction) => {
    let data;
    let files = req.files;
    let teaching_json = JSON.parse(req.body.teaching_excellance);
    let teachingId = JSON.parse(req.body.teachingId);
    // console.log('request upsert json ',JSON.stringify(req.body.teachingId));

    let result = validateWithZod(teachingItemsSchema,teaching_json);
    let fileResult = validateWithZod(filesArraySchema, files);

    if(fileResult.success && result.success){
      data = await updateTeachingService(teaching_json,files,teachingId);
     }
        
    return res.status(200).json(data); 

}

export const deleteTeachingController = async (req : Request ,res : Response ,next : NextFunction) => {
    let id = req.query.id;
    let data = await deleteTeachingService(Number(id));
    return res.status(200).json(data);
}

export const updateViewController = async (req : Request ,res : Response ,next : NextFunction) => {
    let id = req.query.id;
    const data = await updateViewService(Number(id));
    console.log('view json ',JSON.stringify(data))
    return res.status(200).json(data);
}