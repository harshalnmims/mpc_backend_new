import { 
    getTeachingExecellance    
} from '$controller/research/teaching-excellance-controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const teachingRouter = Router();
// import multer from 'multer';
// const upload = multer();

 teachingRouter.get('/teaching-paginate',asyncErrorHandler(getTeachingExecellance));

 export default teachingRouter;