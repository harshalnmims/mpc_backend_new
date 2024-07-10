import { getTeachingExecellance, insertTeachingForm, updateTeachingForm,
    deleteTeachingForm
} from '$controller/research/teaching-excellance-controller'
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const teachingRoutes = Router();

teachingRoutes.get('/teaching-excellance', asyncErrorHandler(getTeachingExecellance));
teachingRoutes.post('/teaching-excellance-insert', asyncErrorHandler(insertTeachingForm));
teachingRoutes.post('/teaching-excellance-update', asyncErrorHandler(updateTeachingForm));
teachingRoutes.post('/teaching-excellance-delete', asyncErrorHandler(deleteTeachingForm));



export default teachingRoutes;