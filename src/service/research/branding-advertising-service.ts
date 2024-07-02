import { getLogger } from '$config/logger-context';
import { getBrandingModel, insertBrandingModel, updateBrandingModel, deleteBrandingModel
 } from '$model/branding-advertising-model';
import exp from 'constants';
import { paginationDefaultType } from 'types/db.default';

import { brandingDetails} from 'types/research.types';
import { number } from 'zod'; 

export const getBrandingService = async ({
    page,
    limit,
    sort,
    order,
    search,
    ...filters
 }: paginationDefaultType) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT RESEARCH SERVICES');
 
    const data = await getBrandingModel({
       page,
       limit,
       sort,
       order,
       search,
       ...filters,
    });
 
    return data;
 };

export const insertBrandingService = async (brandingData : brandingDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET BRANDING ADVERTISING SERVICES');
    console.log('meetingData in service ====>>>>>', brandingData);
 
    const data = await insertBrandingModel(brandingData);
 
    return data;
 };

export const updateBrandingService = async (updateBrandingData : brandingDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET BRANDING ADVERTISING SERVICES');
    console.log('updateBrandingData in service ====>>>>>', updateBrandingData);
 
    const data = await updateBrandingModel(updateBrandingData);
 
    return data;
 };


 export const deleteBrandingService = async (brandingId : number) => {
    const logger = getLogger();
    logger.info('INSIDE GET BRANDING ADVERTISING delete SERVICES');
    console.log('brandingId in service ====>>>>>', brandingId);
 
    const data = await deleteBrandingModel(brandingId);
 
    return data;
 };
