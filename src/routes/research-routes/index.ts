
import {getDashboardModules, getInputData,getViewData,logoutController} from "$controller/research/base.controller"
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

// import { validate } from '$middleware/validation.middleware';
// import { filterSchema } from '$validations/base.valid';
import { filterSchema } from '$validations/base.valid';
import { handleLogout, validateUserSession } from "$middleware/auth.middleware";

const router = Router();

router.get('/input-render-data',asyncErrorHandler(getInputData))
router.get('/input-view-data',asyncErrorHandler(getViewData));
router.get('/dashboard-modules',asyncErrorHandler(validateUserSession),asyncErrorHandler(getDashboardModules))
router.get('/logout',asyncErrorHandler(handleLogout));

export default router;
