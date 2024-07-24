
import { Request, Response, NextFunction } from 'express';
import { facultyPaginateService,facultyScrollPaginateService,facultyRenderService,insertFacultyService,
   facultyViewService,facultyDeleteService,facultyUpdateViewService
 } from "$service/research/faculty-service";
import { validateWithZod } from '$middleware/validation.middleware';
import { facultyObj } from '$validations/research.valid';

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

 export const facultyInsertController = async (req: Request, res: Response, next: NextFunction) => { 
   const faculty = req.body.faculty_data;
   let result = validateWithZod(facultyObj,faculty);
   let data;
   if(result.success){
   data = await insertFacultyService(faculty);
   }
   return res.status(200).json(data);  
}

export const facultyViewController = async (req: Request, res: Response, next: NextFunction) => { 
   const id  = req.query.id;
   const data = await facultyViewService(Number(id));
   return res.status(200).json(data);  
}

export const facultyDeleteController = async (req: Request, res: Response, next: NextFunction) => { 
   const id  = req.query.id;
   const data = await facultyDeleteService(Number(id));
   return res.status(200).json(data);  
}

export const facultyUpdateViewController = async (req: Request, res: Response, next: NextFunction) => { 
   const id  = req.query.id;
   const data = await facultyUpdateViewService(Number(id));
   return res.status(200).json(data);  
}
