import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';
import { validateUserSession } from '$middleware/auth.middleware';
import {adminRenderController} from '$controller/research/admin-controller'
const adminRouter = Router();

adminRouter.get('/admin-render-data',asyncErrorHandler(validateUserSession),asyncErrorHandler(adminRenderController));

export default adminRouter