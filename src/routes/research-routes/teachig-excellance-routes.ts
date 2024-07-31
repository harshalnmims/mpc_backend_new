import { 
getTeachingPaginate,
insertTeachingController,deleteTeachingController, 
updateViewController,updateTeachingController,teachingViewController,teachingDownloadFiles
} from '$controller/research/teaching-excellance-controller';
import { validateUserSession } from '$middleware/auth.middleware';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const teachingRouter = Router();
import multer from 'multer';
const upload = multer();

 teachingRouter.get('/teaching-paginate',asyncErrorHandler(validateUserSession),asyncErrorHandler(getTeachingPaginate));
 teachingRouter.post('/insert-teaching-data',asyncErrorHandler(validateUserSession),upload.any(),asyncErrorHandler(insertTeachingController))
 teachingRouter.get('/teaching-excellance-delete',asyncErrorHandler(validateUserSession),asyncErrorHandler(deleteTeachingController));
 teachingRouter.get('/update-teach-view-data',asyncErrorHandler(validateUserSession),asyncErrorHandler(updateViewController));
 teachingRouter.post('/update-teaching-data',asyncErrorHandler(validateUserSession),upload.any(),asyncErrorHandler(updateTeachingController))
 teachingRouter.get('/view-teaching-data',asyncErrorHandler(validateUserSession),asyncErrorHandler(teachingViewController));
 teachingRouter.get('/teaching-download-files',asyncErrorHandler(validateUserSession),asyncErrorHandler(teachingDownloadFiles))


 export default teachingRouter;