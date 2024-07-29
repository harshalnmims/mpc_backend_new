import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';
import { validateUserSession } from '$middleware/auth.middleware';
import {adminRenderController , adminPaginateController} from '$controller/research/admin-controller'
const adminRouter = Router();

adminRouter.get('/admin-render-data',asyncErrorHandler(validateUserSession),asyncErrorHandler(adminRenderController));
adminRouter.get('/admin-paginate',asyncErrorHandler(validateUserSession),asyncErrorHandler(adminPaginateController));

export default adminRouter