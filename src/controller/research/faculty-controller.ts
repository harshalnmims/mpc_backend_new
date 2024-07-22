
import { Request, Response, NextFunction } from 'express';
import { facultyPaginateService
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