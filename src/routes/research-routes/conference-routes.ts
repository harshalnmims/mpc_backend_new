import { getConference, insertConferenceForm, updateConferenceForm, deleteConferenceForm, renderConferenceLists,
    conferenceEditFrom
} from '$controller/research/conference-controller'
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

import multer from 'multer';
const upload = multer();
import {uploadFile} from '$middleware/fileupload.middleware';


const confereRoutes = Router();

confereRoutes.get('/conference-paginate', asyncErrorHandler(getConference));
confereRoutes.get('/conference-render', asyncErrorHandler(renderConferenceLists));
confereRoutes.post('/conference-insert', upload.any(), asyncErrorHandler(insertConferenceForm));
confereRoutes.get('/conference-edit-view-form', asyncErrorHandler(conferenceEditFrom));
confereRoutes.post('/conference-update', upload.any(),asyncErrorHandler(updateConferenceForm));
confereRoutes.post('/conference-delete', asyncErrorHandler(deleteConferenceForm));




export default confereRoutes;