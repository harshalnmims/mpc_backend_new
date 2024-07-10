import { getMeetingStackholders, insertMeetingStackholdersForm,
    updateMeetingStackholdersForm, deleteMeetingStackholdersForm
} from '$controller/research/meeting-stackholders-controller'
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const meetingRoutes = Router();

meetingRoutes.get('/meeting-stackholders', asyncErrorHandler(getMeetingStackholders));
meetingRoutes.post('/meeting-stackholders-insert', asyncErrorHandler(insertMeetingStackholdersForm));
meetingRoutes.post('/meeting-stackholders-update', asyncErrorHandler(updateMeetingStackholdersForm));
meetingRoutes.post('/meeting-stackholders-delete', asyncErrorHandler(deleteMeetingStackholdersForm));



export default meetingRoutes;