import { getpatentSubmissionData, insertPatentSubmissionForm, updatePatentSubmissionForm, 
    deletePatentSubmissionForm, patentRenderList, patentEditViewForm
} from '$controller/research/patent-submission-controller'
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const patentRoutes = Router();

import multer from 'multer';
const upload = multer();

patentRoutes.get('/patent-submission-and-grant-paginate', asyncErrorHandler(getpatentSubmissionData));
patentRoutes.get('/patent-submission-and-grant-render', asyncErrorHandler(patentRenderList));
patentRoutes.post('/patent-submission-and-grant-insert', upload.array("supporting_documents"),asyncErrorHandler(insertPatentSubmissionForm));
patentRoutes.get('/patent-submission-and-grant-edit-view', asyncErrorHandler(patentEditViewForm));
patentRoutes.post('/patent-submission-and-grant-update', upload.array("supporting_documents"), asyncErrorHandler(updatePatentSubmissionForm));
patentRoutes.post('/patent-submission-delete', asyncErrorHandler(deletePatentSubmissionForm));



export default patentRoutes;