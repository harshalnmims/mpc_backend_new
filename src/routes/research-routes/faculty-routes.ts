import { facultyPaginateController,facultyScrollPaginateController,facultyRenderData,facultyInsertController,
    facultyViewController,facultyDeleteController,facultyUpdateViewController,facultyUpdateController
} from '$controller/research/faculty-controller';
import { validateUserSession } from '$middleware/auth.middleware';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const facultyRouter = Router();

facultyRouter.get('/faculty-paginate', asyncErrorHandler(validateUserSession),asyncErrorHandler(facultyPaginateController));
facultyRouter.get('/faculty-scroll-paginate',asyncErrorHandler(validateUserSession), asyncErrorHandler(facultyScrollPaginateController));
facultyRouter.get('/faculty-render-data',asyncErrorHandler(validateUserSession),asyncErrorHandler(facultyRenderData));
facultyRouter.post('/faculty-insert',asyncErrorHandler(validateUserSession),asyncErrorHandler(facultyInsertController));
facultyRouter.get('/faculty-view-data',asyncErrorHandler(validateUserSession),asyncErrorHandler(facultyViewController));
facultyRouter.get('/faculty-delete',asyncErrorHandler(validateUserSession),asyncErrorHandler(facultyDeleteController))
facultyRouter.get('/faculty-update-view',asyncErrorHandler(validateUserSession),asyncErrorHandler(facultyUpdateViewController));
facultyRouter.post('/faculty-update',asyncErrorHandler(validateUserSession),asyncErrorHandler(facultyUpdateController));



export default facultyRouter;