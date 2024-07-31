import { 
    getMeetingPaginate,insertMeetingController,deleteMeetingController,updateViewController,    
    updateMeetingController,meetingViewController,meetingDownloadFiles
    } from '$controller/research/meeting.controller';
import { validateUserSession } from '$middleware/auth.middleware';
    import { asyncErrorHandler } from '$middleware/error.middleware';
    import { Router } from 'express';
    
    const meetingRouter = Router();
    import multer from 'multer';
    const upload = multer();
    
    meetingRouter.get('/meeting-paginate',asyncErrorHandler(validateUserSession),asyncErrorHandler(getMeetingPaginate));
    meetingRouter.post('/insert-meeting-data',asyncErrorHandler(validateUserSession),upload.any(),asyncErrorHandler(insertMeetingController));
    meetingRouter.get('/meeting-stakeholder-delete',asyncErrorHandler(validateUserSession),asyncErrorHandler(deleteMeetingController));
    meetingRouter.get('/update-meeting-view-data',asyncErrorHandler(validateUserSession),asyncErrorHandler(updateViewController));
    meetingRouter.post('/update-meeting-data',asyncErrorHandler(validateUserSession),upload.any(),asyncErrorHandler(updateMeetingController));
    meetingRouter.get('/view-meeting-data',asyncErrorHandler(validateUserSession),asyncErrorHandler(meetingViewController))
    meetingRouter.get('/meeting-download-files',asyncErrorHandler(validateUserSession),asyncErrorHandler(meetingDownloadFiles));

     export default meetingRouter;