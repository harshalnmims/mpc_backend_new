import { 
    getMeetingPaginate,insertMeetingController,deleteMeetingController,updateViewController,    
    updateMeetingController,meetingViewController
    } from '$controller/research/meeting.controller';
    import { asyncErrorHandler } from '$middleware/error.middleware';
    import { Router } from 'express';
    
    const meetingRouter = Router();
    import multer from 'multer';
    const upload = multer();
    
    meetingRouter.get('/meeting-paginate',asyncErrorHandler(getMeetingPaginate));
    meetingRouter.post('/insert-meeting-data',upload.any(),asyncErrorHandler(insertMeetingController));
    meetingRouter.get('/meeting-stakeholder-delete',asyncErrorHandler(deleteMeetingController));
    meetingRouter.get('/update-meeting-view-data',asyncErrorHandler(updateViewController));
    meetingRouter.post('/update-meeting-data',upload.any(),asyncErrorHandler(updateMeetingController));
    meetingRouter.get('/view-meeting-data',asyncErrorHandler(meetingViewController))

     export default meetingRouter;