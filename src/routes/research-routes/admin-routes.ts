import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';
import { validateUserSession } from '$middleware/auth.middleware';
import {adminRenderController , adminPaginateController ,adminDashboardModulesController} from '$controller/research/admin-controller'
const adminRouter = Router();

adminRouter.get('/admin-render-data',asyncErrorHandler(validateUserSession),asyncErrorHandler(adminRenderController));
adminRouter.get('/admin-paginate',asyncErrorHandler(validateUserSession),asyncErrorHandler(adminPaginateController));
adminRouter.get('/admin-dashboard-modules',asyncErrorHandler(validateUserSession),asyncErrorHandler(adminDashboardModulesController))


export default adminRouter