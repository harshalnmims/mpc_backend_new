import { getConference, insertConferenceForm, updateConferenceForm, deleteConferenceForm
} from '$controller/research/conference-controller'
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const confereRoutes = Router();

confereRoutes.get('/conference', asyncErrorHandler(getConference));
confereRoutes.post('/conference-insert', asyncErrorHandler(insertConferenceForm));
confereRoutes.post('/conference-update', asyncErrorHandler(updateConferenceForm));
confereRoutes.post('/conference-delete', asyncErrorHandler(deleteConferenceForm));




export default confereRoutes;