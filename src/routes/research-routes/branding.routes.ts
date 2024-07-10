import { 
    getBrandingPaginate,insertBrandingController,deleteBrandingDelete,updateViewController,
    updateBrandingController,brandingViewController,    
    brandingDownloadFiles
    } from '$controller/research/branding.controller';
    import { asyncErrorHandler } from '$middleware/error.middleware';
    import { Router } from 'express';
    
    const brandingRouter = Router();
    import multer from 'multer';
    const upload = multer();
    
    brandingRouter.get('/branding-paginate',asyncErrorHandler(getBrandingPaginate));
    brandingRouter.post('/insert-branding-data',upload.any(),asyncErrorHandler(insertBrandingController))
    brandingRouter.get('/branding-advertisement-delete',asyncErrorHandler(deleteBrandingDelete));
    brandingRouter.get('/update-branding-view-data',asyncErrorHandler(updateViewController));
    brandingRouter.post('/update-branding-data',upload.any(),asyncErrorHandler(updateBrandingController))
    brandingRouter.get('/view-branding-data',asyncErrorHandler(brandingViewController))
    brandingRouter.get('/branding-download-files',asyncErrorHandler(brandingDownloadFiles))



    
     export default brandingRouter;