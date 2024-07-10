
import {getInputData,getViewData} from "$controller/research/base.controller"
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

// import { validate } from '$middleware/validation.middleware';
// import { filterSchema } from '$validations/base.valid';
import { filterSchema } from '$validations/base.valid';

const router = Router();

router.get('/input-render-data',asyncErrorHandler(getInputData))
router.get('/input-view-data',asyncErrorHandler(getViewData));


export default router;
