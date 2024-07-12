import { 
getTeachingPaginate,
insertTeachingController,deleteTeachingController, 
updateViewController,updateTeachingController,teachingViewController,teachingDownloadFiles
} from '$controller/research/teaching-excellance-controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const teachingRouter = Router();
import multer from 'multer';
const upload = multer();

 teachingRouter.get('/teaching-paginate',asyncErrorHandler(getTeachingPaginate));
 teachingRouter.post('/insert-teaching-data',upload.any(),asyncErrorHandler(insertTeachingController))
 teachingRouter.get('/teaching-excellance-delete',asyncErrorHandler(deleteTeachingController));
 teachingRouter.get('/update-teach-view-data',asyncErrorHandler(updateViewController));
 teachingRouter.post('/update-teaching-data',upload.any(),asyncErrorHandler(updateTeachingController))
 teachingRouter.get('/view-teaching-data',asyncErrorHandler(teachingViewController));
 teachingRouter.get('/teaching-download-files',asyncErrorHandler(teachingDownloadFiles))


 export default teachingRouter;