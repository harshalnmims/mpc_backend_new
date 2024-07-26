import { getLogger } from '$config/logger-context';
import { validateWithZod } from '$middleware/validation.middleware';
import { insertEContentService, updateEContentService, deleteEContentService , eContentPaginateService,
    eContentViewService
 } from "$service/research/e-content-service";
import { eContentObj } from '$validations/research.valid';
import { Request, Response, NextFunction } from 'express';

export const insertEContent = async (req: Request, res: Response, next: NextFunction) => {
     console.log('request body e content ',JSON.stringify(req.body))
     const eContent = req.body.e_content;
     let result = validateWithZod(eContentObj,eContent);
     let data;
     if(result.success){
     data = await insertEContentService(eContent);
     }
     return res.status(200).json(data);  
}

export const updateEContent = async (req: Request, res: Response, next: NextFunction) => {
  
    const eContent = req.body.e_content;
    const data = await updateEContentService(eContent);

    return res.status(200).json(data);
}

export const deleteEContent = async (req: Request, res: Response, next: NextFunction) => {

    const eContentId = req.query.id;
    const data = await deleteEContentService(Number(eContentId));

    return res.status(200).json(data);
}

export const eContentPaginateController = async (req: Request, res: Response, next: NextFunction) => {
    const {
        page = 1,
        limit = 10,
        sort = '',
        order = 'desc',
        search = '',
        ...filters
     } = { ...req.body, ...req.params, ...req.query };

 const data = await eContentPaginateService({
     page ,
     limit,
     search,  
     sort,
     order,
     filters,
  });

  return res.status(200).json(data); 
}


export const eContentViewData = async (req: Request, res: Response, next: NextFunction) => {
  
    const eContentId = req.query.id;
    const data = await eContentViewService(Number(eContentId));

    return res.status(200).json(data);
}