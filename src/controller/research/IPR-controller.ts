import { insertIPRService, updateIPRService, deleteIPRService } from '$service/research/IPR-service';
import { getLogger } from '$config/logger-context';
import { Request, Response, NextFunction } from 'express';

export const insertIpr = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE INSERT IPR');
    let username = res.locals.username;
    const IPRDetails = { ...req.body};
     const data = await insertIPRService(IPRDetails,username);
 
     return res.status(200).json(data);
}

export const updateIPR = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE UPDATE IPR');
    let username = res.locals.username;
    const IPRDetails = { ...req.body};
    const data = await updateIPRService(IPRDetails,username);

    return res.status(200).json(data);
}

export const deleteIPR = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE DELETE IPR');

    const iprDetails = { ...req.body};
    const iprId = iprDetails.ipr_id;
    let username = res.locals.username;

    const data = await deleteIPRService(iprId,username);
    
    return res.status(200).json(data);
}