import { 
    getBrandingPaginate,insertBrandingController,deleteBrandingDelete    
    } from '$controller/research/branding.controller';
    import { asyncErrorHandler } from '$middleware/error.middleware';
    import { Router } from 'express';
    
    const brandingRouter = Router();
    import multer from 'multer';
    const upload = multer();
    
    brandingRouter.get('/branding-paginate',asyncErrorHandler(getBrandingPaginate));
    brandingRouter.post('/insert-branding-data',upload.any(),asyncErrorHandler(insertBrandingController))
    brandingRouter.get('/branding-advertisement-delete',asyncErrorHandler(deleteBrandingDelete));
    
     export default brandingRouter;