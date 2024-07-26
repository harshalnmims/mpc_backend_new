import { facultyPaginateController,facultyScrollPaginateController,facultyRenderData,facultyInsertController,
    facultyViewController,facultyDeleteController,facultyUpdateViewController,facultyUpdateController
} from '$controller/research/faculty-controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const facultyRouter = Router();

facultyRouter.get('/faculty-paginate', asyncErrorHandler(facultyPaginateController));
facultyRouter.get('/faculty-scroll-paginate', asyncErrorHandler(facultyScrollPaginateController));
facultyRouter.get('/faculty-render-data',asyncErrorHandler(facultyRenderData));
facultyRouter.post('/faculty-insert',asyncErrorHandler(facultyInsertController));
facultyRouter.get('/faculty-view-data',asyncErrorHandler(facultyViewController));
facultyRouter.get('/faculty-delete',asyncErrorHandler(facultyDeleteController))
facultyRouter.get('/faculty-update-view',asyncErrorHandler(facultyUpdateViewController));
facultyRouter.post('/faculty-update',asyncErrorHandler(facultyUpdateController));



export default facultyRouter;