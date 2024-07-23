
import { Request, Response, NextFunction } from 'express';
import { facultyPaginateService,facultyScrollPaginateService,facultyRenderService
 } from "$service/research/faculty-service";

export const facultyPaginateController = async(req : Request,res : Response,next : NextFunction) => {
    const {
        page = 1,
        limit = 10,
        sort = '',
        order = 'desc',
        search = '',
        ...filters
     } = { ...req.body, ...req.params, ...req.query };

 const data = await facultyPaginateService({
     page ,
     limit,
     search,  
     sort,
     order,
     filters,
  });

  return res.status(200).json(data); 
}

export const facultyScrollPaginateController = async (req: Request, res: Response, next: NextFunction) => {
 
    const {
       page = 1,
       limit = 10,
       sort = '',
       order = 'desc',
       search = '',
       ...filters
    } = { ...req.body, ...req.params, ...req.query };
 
    const data = await facultyScrollPaginateService({
       page,
       limit,
       search,
       sort,
       order,
       filters,
    });
 
    return res.status(200).json(data);
 };

 export const facultyRenderData = async (req: Request, res: Response, next: NextFunction) => { 
    const data = await facultyRenderService();
    return res.status(200).json(data);
 }
