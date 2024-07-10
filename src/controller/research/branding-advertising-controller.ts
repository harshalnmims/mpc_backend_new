import { getLogger } from '$config/logger-context';
import {
    getBrandingService, insertBrandingService, updateBrandingService,
    deleteBrandingService
   } from '$service/research/branding-advertising-service';
import { Request, Response, NextFunction } from 'express';

export const getBrandingAdvertising = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET TEACHING EXECELLANCE  CONTROLLER');
 
    const {
       page = 1,
       limit = 10,
       sort = '',
       order = 'desc',
       search = '',
       ...filters
    } = { ...req.body, ...req.params, ...req.query };
 
    const data = await getBrandingService({
       page,
       limit,
       search,
       sort,
       order,
       filters,
    });
 
    return res.status(200).json(data);
};


export const insertBrandingForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET TEACHING EXCELLANCE CONTROLLER');

    const brandingData = {...req.body};

    const data = await insertBrandingService(brandingData);

    console.log(' data response in case of insert controller ===>>>>', data);
    return res.status(200).json(data)

};

export const updateBrandingForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET TEACHING EXCELLANCE CONTROLLER');

    const updateBrandingData = {...req.body};

    const data = await updateBrandingService(updateBrandingData);

    console.log(' data response in case of insert controller ===>>>>', data);
    return res.status(200).json(data)

};

export const deleteBrandingForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET BRANDING ADVERTISING CONTROLLER');

    const brandingData = {...req.body};
    const brandingId = brandingData.branding_id;

    const data = await deleteBrandingService(brandingId);

    console.log(' data response in case of insert controller ===>>>>', data);
    return res.status(200).json(data)

};


