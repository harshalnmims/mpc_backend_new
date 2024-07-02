import { getpatentSubmissionData, insertPatentSubmissionForm, updatePatentSubmissionForm, 
    deletePatentSubmissionForm
} from '$controller/research/patent-submission-controller'
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const patentRoutes = Router();

patentRoutes.get('/patent-submission', asyncErrorHandler(getpatentSubmissionData));
patentRoutes.post('/patent-submission-insert', asyncErrorHandler(insertPatentSubmissionForm));
patentRoutes.post('/patent-submission-update', asyncErrorHandler(updatePatentSubmissionForm));
patentRoutes.post('/patent-submission-delete', asyncErrorHandler(deletePatentSubmissionForm));



export default patentRoutes;