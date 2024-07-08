import {
    getTeachingPaginateService
   } from '$service/research/teaching.service';
import { Request, Response, NextFunction } from 'express';
import { validateWithZod } from '$middleware/validation.middleware';
import { filesArraySchema , teachingItemsSchema } from '$validations/research.valid';
import {insertTeachingService,deleteTeachingService} from '$service/research/teaching.service';


export const getTeachingPaginate = async(req : Request ,res : Response ,next : NextFunction) => {
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

export const deleteTeachingController = async (req : Request ,res : Response ,next : NextFunction) => {
    let id = req.query.id;
    let data = await deleteTeachingService(Number(id));
    return res.status(200).json(data);
}