import { getLogger } from '$config/logger-context';
import { insertEContentService, updateEContentService, deleteEContentService } from "$service/research/e-content-service";
import { Request, Response, NextFunction } from 'express';

export const insertEContent = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE INSERT IPR CONTROLLER');

    const eContent = { ...req.body};
     const data = await insertEContentService(eContent);
 
     return res.status(200).json(data);  
}

export const updateEContent = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE UPDATE IPR CONTROLLER');
    const eContent = {...req.body};
    const data = await updateEContentService(eContent);

    return res.status(200).json(data);
}

export const deleteEContent = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE DELETE IPR CONTROLLER');
    const eContentDetails = await {...req.body}
    const eContentId = eContentDetails.eContentId
    const data = await deleteEContentService(eContentId);

    return res.status(200).json(data);
}