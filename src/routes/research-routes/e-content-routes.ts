import { insertEContent, updateEContent, deleteEContent , eContentPaginateController, 
    eContentViewData
} from '$controller/research/e-content-controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';
import { validateUserSession } from '$middleware/auth.middleware';

const eContentRouter = Router();

eContentRouter.post('/insert-e-content',asyncErrorHandler(validateUserSession),asyncErrorHandler(insertEContent));
eContentRouter.post('/update-e-content',asyncErrorHandler(validateUserSession), asyncErrorHandler(updateEContent));
eContentRouter.get('/delete-e-content',asyncErrorHandler(validateUserSession), asyncErrorHandler(deleteEContent));
eContentRouter.get('/e-content-paginate',asyncErrorHandler(validateUserSession), asyncErrorHandler(eContentPaginateController))
eContentRouter.get('/e-content-view-data',asyncErrorHandler(validateUserSession),asyncErrorHandler(eContentViewData));



export default eContentRouter;