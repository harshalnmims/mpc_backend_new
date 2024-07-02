import { getAttendees, getCourseAnchor, getProgramAnchor } from '$controller/faculty/anchor.controller';
import { getCampus, getPrograms, getSession, getSubject } from '$controller/faculty/base.controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';
import Analyticsrouter from './analytics';
import formARouter from './formA';
import formBRouter from './formB';
import materFormRouter from './master';
// import { validate } from '$middleware/validation.middleware';
import { filterSchema } from '$validations/base.valid';

const router = Router();

// router.get('/campus',asyncErrorHandler(validate(filterSchema)), asyncErrorHandler(getCampus));
router.get('/programs', asyncErrorHandler(getPrograms));
router.get('/acad-session', asyncErrorHandler(getSession));
router.get('/subject', asyncErrorHandler(getSubject));
router.get('/getCourseAnchor', asyncErrorHandler(getCourseAnchor));
router.get('/getProgramAnchor', asyncErrorHandler(getProgramAnchor));
router.get('/getAttendees', asyncErrorHandler(getAttendees));

router.use('/', materFormRouter);
router.use('/', Analyticsrouter);
router.use('/', formARouter);
router.use('/', formBRouter);


export default router;
