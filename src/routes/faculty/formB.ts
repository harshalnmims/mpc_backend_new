import { submitFormA, updateFormA, viewFormA } from '$controller/faculty/formA.controller';
import { submitFormB, updateFormB, viewFormB } from '$controller/faculty/formB.controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const formBRouter = Router();

formBRouter.get('/submit-formB', asyncErrorHandler(submitFormB));
formBRouter.get('/view-formB', asyncErrorHandler(viewFormB));
formBRouter.get('/update-formB', asyncErrorHandler(updateFormB));


export default formBRouter;