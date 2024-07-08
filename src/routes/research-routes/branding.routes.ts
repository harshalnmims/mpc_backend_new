import { 
    getBrandingPaginate    
    } from '$controller/research/branding.controller';
    import { asyncErrorHandler } from '$middleware/error.middleware';
    import { Router } from 'express';
    
    const brandingRouter = Router();
    // import multer from 'multer';
    // const upload = multer();
    
    brandingRouter.get('/branding-paginate',asyncErrorHandler(getBrandingPaginate));
    
     export default brandingRouter;