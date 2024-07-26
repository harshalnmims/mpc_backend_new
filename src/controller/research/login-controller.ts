import {Request,Response,NextFunction} from 'express'
import {loginService} from '$service/research/login-service';

export const loginController = async (req:Request,res:Response,next:NextFunction) => {
   let {username,password} = req.body.login_data;
   const data = await loginService(username,password,req,res);
   return res.status(200).json(data);
} 