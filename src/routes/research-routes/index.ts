
import {getDashboardModules, getInputData,getViewData} from "$controller/research/base.controller"
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

// import { validate } from '$middleware/validation.middleware';
// import { filterSchema } from '$validations/base.valid';
import { filterSchema } from '$validations/base.valid';
import { validateUserSession } from "$middleware/auth.middleware";

const router = Router();

router.get('/input-render-data',asyncErrorHandler(getInputData))
router.get('/input-view-data',asyncErrorHandler(getViewData));
router.get('/dashboard-modules',asyncErrorHandler(validateUserSession),asyncErrorHandler(getDashboardModules))


export default router;
