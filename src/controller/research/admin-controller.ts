import {Request,Response,NextFunction} from 'express'
import {adminRenderService,adminPaginateService} from '$service/research/admin-service'

export const adminRenderController = async (req:Request,res:Response,next:NextFunction) => {
   let username = res.locals.username;
   const data = await adminRenderService(username);
   return res.status(200).json(data);
} 

export const adminPaginateController = async (req: Request, res: Response, next: NextFunction) => {
 
   const {
      page = 1,
      limit = 10,
      sort = '',
      order = 'desc',
      search = '',
      ...filters
   } = { ...req.body, ...req.params, ...req.query };

   const data = await adminPaginateService({
      page,
      limit,
      search,
      sort,
      order,
      filters,
   });

   return res.status(200).json(data);
};