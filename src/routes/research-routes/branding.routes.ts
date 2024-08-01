import { 
    getBrandingPaginate,insertBrandingController,deleteBrandingDelete,updateViewController,
    updateBrandingController,brandingViewController,    
    brandingDownloadFiles
    } from '$controller/research/branding.controller';
import { validateUserSession } from '$middleware/auth.middleware';
    import { asyncErrorHandler } from '$middleware/error.middleware';
    import { Router } from 'express';
    
    const brandingRouter = Router();
    import multer from 'multer';
    const upload = multer();
    
    brandingRouter.get('/branding-paginate',asyncErrorHandler(validateUserSession),asyncErrorHandler(getBrandingPaginate));
    brandingRouter.post('/insert-branding-data',asyncErrorHandler(validateUserSession),upload.any(),asyncErrorHandler(insertBrandingController))
    brandingRouter.get('/branding-advertisement-delete',asyncErrorHandler(validateUserSession),asyncErrorHandler(deleteBrandingDelete));
    brandingRouter.get('/update-branding-view-data',asyncErrorHandler(validateUserSession),asyncErrorHandler(updateViewController));
    brandingRouter.post('/update-branding-data',asyncErrorHandler(validateUserSession),upload.any(),asyncErrorHandler(updateBrandingController))
    brandingRouter.get('/view-branding-data',asyncErrorHandler(validateUserSession),asyncErrorHandler(brandingViewController))
    brandingRouter.get('/branding-download-files',asyncErrorHandler(validateUserSession),asyncErrorHandler(brandingDownloadFiles))



    
     export default brandingRouter;