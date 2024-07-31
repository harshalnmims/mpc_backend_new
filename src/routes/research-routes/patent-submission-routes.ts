import {
   getpatentSubmissionData,
   insertPatentSubmissionForm,
   updatePatentSubmissionForm,
   deletePatentSubmissionForm,
   patentRenderList,
   patentEditViewForm,
   viewPatentForm,
   downloadPatentFiles,
} from '$controller/research/patent-submission-controller';
import { validateUserSession } from '$middleware/auth.middleware';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const patentRoutes = Router();

import multer from 'multer';
const upload = multer();

patentRoutes.get('/patent-submission-and-grant-paginate',asyncErrorHandler(validateUserSession), asyncErrorHandler(getpatentSubmissionData));
patentRoutes.get('/patent-submission-and-grant-render',asyncErrorHandler(validateUserSession), asyncErrorHandler(patentRenderList));
patentRoutes.post(
   '/patent-submission-and-grant-insert',asyncErrorHandler(validateUserSession),
   upload.array('supporting_documents'),
   asyncErrorHandler(insertPatentSubmissionForm),
);
patentRoutes.get('/patent-submission-and-grant-edit-view',asyncErrorHandler(validateUserSession), asyncErrorHandler(patentEditViewForm));
patentRoutes.post(
   '/patent-submission-and-grant-update',asyncErrorHandler(validateUserSession),
   upload.array('supporting_documents'),
   asyncErrorHandler(updatePatentSubmissionForm),
);
patentRoutes.get('/patent-submission-and-grant-view',asyncErrorHandler(validateUserSession), asyncErrorHandler(viewPatentForm));
patentRoutes.get('/patent-submission-and-grant-download-files',asyncErrorHandler(validateUserSession), asyncErrorHandler(downloadPatentFiles));

patentRoutes.post('/patent-submission-and-grant-delete',asyncErrorHandler(validateUserSession), asyncErrorHandler(deletePatentSubmissionForm));

export default patentRoutes;
