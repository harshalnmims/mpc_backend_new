// import insertIPRService from '$service/research/IPR-service';
import { getLogger } from '$config/logger-context';
import { Request, Response, NextFunction } from 'express';

export const insertIpr = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE INSERT IPR');

    const IPRDetails = { ...req.body};
    // const data = await insertIPRService(IPRDetails);
 
    // return res.status(200).json(data);

}