import {Request,Response,NextFunction} from 'express'
import {getPaginateService} from '$service/research/branding.service'
import { brandingItemsSchema, filesArraySchema } from '$validations/research.valid';
import { validateWithZod } from '$middleware/validation.middleware';
import {insertBrandingService,deleteBrandingService} from '$service/research/branding.service'


export const getBrandingPaginate = async (req:Request,res:Response,next:NextFunction) => {
    const {
        page = 1,
        limit = 10,
        sort = '',
        order = 'desc',
        search = '',
        ...filters
     } = { ...req.body, ...req.params, ...req.query };

     const data = await getPaginateService({
     page ,
     limit,
     search,  
     sort,
     order,
     filters,
  });
    return res.status(200).json(data);
}

export const insertBrandingController = async(req : Request ,res : Response ,next : NextFunction) => {
    let data;
    let files = req.files;
    let branding_json = JSON.parse(req.body.branding_advertisement);

    let result = validateWithZod(brandingItemsSchema,branding_json);
    let fileResult = validateWithZod(filesArraySchema, files);

    if(fileResult.success && result.success){
      data = await insertBrandingService(branding_json,files);
     }
        
    return res.status(200).json(data); 
}

export const deleteBrandingDelete = async (req : Request ,res : Response ,next : NextFunction) => {
    let id = req.query.id;
    const data = await deleteBrandingService(Number(id));
    return res.status(200).json(data);
}