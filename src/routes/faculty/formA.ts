import { submitFormA, updateFormA, viewFormA } from '$controller/faculty/formA.controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const formARouter = Router();

formARouter.get('/submit-formA', asyncErrorHandler(submitFormA));
formARouter.get('/view-formA', asyncErrorHandler(viewFormA));
formARouter.get('/update-formA', asyncErrorHandler(updateFormA));

export default formARouter;
