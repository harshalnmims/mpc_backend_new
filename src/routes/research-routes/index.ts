
import {getDashboardModules, getInputData,getViewData,logoutController,researchModulesController,
    getPublicationModules,
    userRoleController
} from "$controller/research/base.controller"
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

// import { validate } from '$middleware/validation.middleware';
// import { filterSchema } from '$validations/base.valid';
import { filterSchema } from '$validations/base.valid';
import { handleLogout, validateUserSession } from "$middleware/auth.middleware";

const router = Router();

router.get('/input-render-data',asyncErrorHandler(validateUserSession),asyncErrorHandler(getInputData))
router.get('/input-view-data',asyncErrorHandler(validateUserSession),asyncErrorHandler(getViewData));
router.get('/dashboard-modules',asyncErrorHandler(validateUserSession),asyncErrorHandler(getDashboardModules))
router.get('/logout',asyncErrorHandler(handleLogout));
router.get('/research-modules',asyncErrorHandler(validateUserSession),asyncErrorHandler(researchModulesController));
router.get('/publication-modules',asyncErrorHandler(validateUserSession),asyncErrorHandler(getPublicationModules));
router.get('/user-role',asyncErrorHandler(validateUserSession),asyncErrorHandler(userRoleController));

export default router;
