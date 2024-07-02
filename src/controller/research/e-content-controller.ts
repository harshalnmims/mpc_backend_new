// import { getLogger } from '$config/logger-context';
// import { insertEContentService } from "$service/research/e-content-service";
// import { Request, Response, NextFunction } from 'express';

// export const insertEContent = async (req: Request, res: Response, next: NextFunction) => {
//     const logger = getLogger();
//     logger.info('INSIDE INSERT IPR CONTROLLER');

//     const eContent = { ...req.body};
//      const data = await insertEContentService(eContent);
 
//      return res.status(200).json(data);  
// }