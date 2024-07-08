import { 
getTeachingPaginate,
insertTeachingController,deleteTeachingController 
} from '$controller/research/teaching-excellance-controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const teachingRouter = Router();
import multer from 'multer';
const upload = multer();

 teachingRouter.get('/teaching-paginate',asyncErrorHandler(getTeachingPaginate));
 teachingRouter.post('/insert-teaching-data',upload.any(),asyncErrorHandler(insertTeachingController))
 teachingRouter.get('/teaching-excellance-delete',asyncErrorHandler(deleteTeachingController));

 export default teachingRouter;