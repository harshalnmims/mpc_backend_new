import { 
    getMeetingPaginate,insertMeetingController,deleteMeetingController    
    } from '$controller/research/meeting.controller';
    import { asyncErrorHandler } from '$middleware/error.middleware';
    import { Router } from 'express';
    
    const meetingRouter = Router();
    import multer from 'multer';
    const upload = multer();
    
    meetingRouter.get('/meeting-paginate',asyncErrorHandler(getMeetingPaginate));
    meetingRouter.post('/insert-meeting-data',upload.any(),asyncErrorHandler(insertMeetingController));
    meetingRouter.get('/meeting-stakeholder-delete',asyncErrorHandler(deleteMeetingController));
    
     export default meetingRouter;