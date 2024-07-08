import { 
    getMeetingPaginate    
    } from '$controller/research/meeting.controller';
    import { asyncErrorHandler } from '$middleware/error.middleware';
    import { Router } from 'express';
    
    const meetingRouter = Router();
    // import multer from 'multer';
    // const upload = multer();
    
    meetingRouter.get('/meeting-paginate',asyncErrorHandler(getMeetingPaginate));
    
     export default meetingRouter;