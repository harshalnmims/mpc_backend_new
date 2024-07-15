import {iprPaginateService, insertIPRService, updateIPRService, deleteIPRService,

    iprRenderService

 } from '$service/research/IPR-service';

import { getLogger } from '$config/logger-context';

import { Request, Response, NextFunction } from 'express';

import { validateWithZod } from '$middleware/validation.middleware';

import { filesArraySchema } from '$validations/research.valid';

import AWS from 'aws-sdk';

import { AwsData } from 'types/base.types';






export const iprPaginate =  async (req : Request,res : Response , next : NextFunction) => {

   

    

    const {

           page = 1,

           limit = 10,

           sort = '',

           order = 'desc',

           search = '',

           ...filters

        } = { ...req.body, ...req.params, ...req.query };

 

    const data = await iprPaginateService({

        page ,

        limit,

        search,  

        sort,

        order,

        filters,

     });




     console.log('data responce in controller ====>>>>>', data)

  

     return res.status(200).json(data); 

   

  } 






export const iprRenderData = async (req : Request , res : Response , next  : NextFunction) => {




    const data = await iprRenderService();

    console.log('journal data ',JSON.stringify(data));

    return res.status(200).json(data);

  }




export const insertIpr = async (req: Request, res: Response, next: NextFunction) => {

    const logger = getLogger();

    logger.info('INSIDE INSERT IPR');




    const IPRDetails = { ...req.body};

     const data = await insertIPRService(IPRDetails);

 

     return res.status(200).json(data);

}




export const updateIPR = async (req: Request, res: Response, next: NextFunction) => {

    const logger = getLogger();

    logger.info('INSIDE UPDATE IPR');




    const IPRDetails = { ...req.body};

    const data = await updateIPRService(IPRDetails);




    return res.status(200).json(data);

}




export const deleteIPR = async (req: Request, res: Response, next: NextFunction) => {

    const logger = getLogger();

    logger.info('INSIDE DELETE IPR');




    const iprDetails = { ...req.body};

    const iprId = iprDetails.ipr_id;




    const data = await deleteIPRService(iprId);

    

    return res.status(200).json(data);

}