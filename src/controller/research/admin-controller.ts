import {Request,Response,NextFunction} from 'express'
import {adminRenderService} from '$service/research/admin-service'

export const adminRenderController = async (req:Request,res:Response,next:NextFunction) => {
   let username = res.locals.username;
   const data = await adminRenderService(username);
   return res.status(200).json(data);
} 