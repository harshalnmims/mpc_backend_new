import { getpatentSubmissionData, insertPatentSubmissionForm, updatePatentSubmissionForm, 
    deletePatentSubmissionForm
} from '$controller/research/patent-submission-controller'
import { validateUserSession } from '$middleware/auth.middleware';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const patentRoutes = Router();

patentRoutes.get('/patent-submission',asyncErrorHandler(validateUserSession), asyncErrorHandler(getpatentSubmissionData));
patentRoutes.post('/patent-submission-insert',asyncErrorHandler(validateUserSession), asyncErrorHandler(insertPatentSubmissionForm));
patentRoutes.post('/patent-submission-update',asyncErrorHandler(validateUserSession), asyncErrorHandler(updatePatentSubmissionForm));
patentRoutes.post('/patent-submission-delete',asyncErrorHandler(validateUserSession), asyncErrorHandler(deletePatentSubmissionForm));



export default patentRoutes;