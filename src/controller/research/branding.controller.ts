import {Request,Response,NextFunction} from 'express'
import {getPaginateService,updateViewService,insertBrandingService,deleteBrandingService,updateBrandingService,brandingViewService,brandingDownloadFileService} 
from '$service/research/branding.service'
import { brandingItemsSchema, filesArraySchema } from '$validations/research.valid';
import { validateWithZod } from '$middleware/validation.middleware';


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

export const updateViewController = async (req : Request ,res : Response ,next : NextFunction) => {
    let id = req.query.id;
    const data = await updateViewService(Number(id));
    console.log('view json ',JSON.stringify(data))
    return res.status(200).json(data);
}

export const brandingViewController = async (req : Request ,res : Response ,next : NextFunction) => {
    let id = req.query.id;
    const data = await brandingViewService(Number(id));
    console.log('view json ',JSON.stringify(data))
    return res.status(200).json(data);
}

export const updateBrandingController = async(req : Request ,res : Response ,next : NextFunction) => {
    let data;
    let files = req.files;
    let branding_json = JSON.parse(req.body.branding_advertisement);
    let brandingId = JSON.parse(req.body.brandingId);

    let result = validateWithZod(brandingItemsSchema,branding_json);
    let fileResult = validateWithZod(filesArraySchema, files);

    if(fileResult.success && result.success){
      data = await updateBrandingService(branding_json,files,brandingId);
     }
        
    return res.status(200).json(data); 
}

export const brandingDownloadFiles = async (req : Request , res : Response , next  : NextFunction) => {
   const id = req.query.id;
   const abbr = req.query.abbr;
   console.log('id ',id,abbr)

    await brandingDownloadFileService(Number(id),String(abbr),req,res);
}