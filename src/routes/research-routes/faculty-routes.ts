import { facultyPaginateController
} from '$controller/research/faculty-controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const facultyRouter = Router();

facultyRouter.get('/faculty-paginate', asyncErrorHandler(facultyPaginateController));
// eContentRouter.post('/update-e-content', asyncErrorHandler(updateEContent));
// eContentRouter.get('/delete-e-content', asyncErrorHandler(deleteEContent));
// eContentRouter.get('/e-content-paginate', asyncErrorHandler(eContentPaginateController))
// eContentRouter.get('/e-content-view-data',asyncErrorHandler(eContentViewData));



export default facultyRouter;