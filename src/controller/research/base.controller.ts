import { Request, Response, NextFunction } from 'express';
import {inputService,inputViewService,getDashboardService,getresearchModulesService,getPublicationModulesService} from '$service/research/base.service'

export const getInputData = async (req : Request,res : Response ,next : NextFunction) => {
   const data = await inputService();
   return res.status(200).json(data);
}

export const getViewData = async (req : Request,res : Response ,next : NextFunction) => {
   const data = await inputViewService();
   return res.status(200).json(data);
}

export const getDashboardModules = async (req : Request,res : Response ,next : NextFunction) => {
  const data = await getDashboardService();
  return res.status(200).json(data);;
}

export const logoutController = async (req : Request,res : Response ,next : NextFunction) => {
   const data = await getDashboardService();
   return res.status(200).json(data);;
 }
 
 export const researchModulesController = async (req : Request,res : Response ,next : NextFunction) => {
   let username = res.locals.username;
   const data = await getresearchModulesService(username);
   return res.status(200).json(data);;
 }

 export const getPublicationModules = async (req : Request,res : Response ,next : NextFunction) => {
   let username = res.locals.username;
   const data = await getPublicationModulesService(username);
   return res.status(200).json(data);;
 }

 export const testLogin = async (req : Request,res : Response ,next : NextFunction) => {
   return res.status(200).json({status:200,message:'Success'})
 }
