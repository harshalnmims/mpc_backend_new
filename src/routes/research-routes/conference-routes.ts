import {
   getConference,
   insertConferenceForm,
   updateConferenceForm,
   deleteConferenceForm,
   renderConferenceLists,
   conferenceEditFrom,
   viewConferenceForm,
   downloadConferenceFiles,
} from '$controller/research/conference-controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

import multer from 'multer';
const upload = multer();
import { uploadFile } from '$middleware/fileupload.middleware';
import { validateUserSession } from '$middleware/auth.middleware';

const confereRoutes = Router();

confereRoutes.get('/conference-paginate',asyncErrorHandler(validateUserSession) ,asyncErrorHandler(getConference));
confereRoutes.get('/conference-render', asyncErrorHandler(validateUserSession),asyncErrorHandler(renderConferenceLists));
confereRoutes.post('/conference-insert',asyncErrorHandler(validateUserSession), upload.any(), asyncErrorHandler(insertConferenceForm));
confereRoutes.get('/conference-edit-view-form',asyncErrorHandler(validateUserSession), asyncErrorHandler(conferenceEditFrom));
confereRoutes.post('/conference-update',asyncErrorHandler(validateUserSession), upload.any(), asyncErrorHandler(updateConferenceForm));
confereRoutes.get('/conference-view-form',asyncErrorHandler(validateUserSession), asyncErrorHandler(viewConferenceForm));
confereRoutes.get('/conference-download-files',asyncErrorHandler(validateUserSession), asyncErrorHandler(downloadConferenceFiles));
confereRoutes.get('/conference-delete',asyncErrorHandler(validateUserSession), asyncErrorHandler(deleteConferenceForm));

export default confereRoutes;
