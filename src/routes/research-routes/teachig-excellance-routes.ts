import { 
    getTeachingExecellance,
insertTeachingController,deleteTeachingController, 
updateViewController,updateTeachingController
} from '$controller/research/teaching-excellance-controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const teachingRouter = Router();
import multer from 'multer';
const upload = multer();

teachingRouter.get('/teaching-excellance', asyncErrorHandler(getTeachingExecellance));
 teachingRouter.post('/insert-teaching-data',upload.any(),asyncErrorHandler(insertTeachingController))
 teachingRouter.get('/teaching-excellance-delete',asyncErrorHandler(deleteTeachingController));
 teachingRouter.get('/update-teach-view-data',asyncErrorHandler(updateViewController));
 teachingRouter.post('/update-teaching-data',upload.any(),asyncErrorHandler(updateTeachingController))


 export default teachingRouter;