import { Request, Response, NextFunction } from 'express';
import {inputService,inputViewService} from '$service/research/base.service'

export const getInputData = async (req : Request,res : Response ,next : NextFunction) => {
   const data = await inputService();
   return res.status(200).json(data);
}

export const getViewData = async (req : Request,res : Response ,next : NextFunction) => {
   const data = await inputViewService();
   return res.status(200).json(data);
}