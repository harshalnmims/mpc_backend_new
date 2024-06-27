import { getAttendees, getCourseAnchor, getProgramAnchor } from '$controller/faculty/anchor.controller';
import { getCampus, getPrograms, getSession, getSubject } from '$controller/faculty/base.controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

import { validate } from '$middleware/validation.middleware';
import { filterSchema } from '$validations/base.valid';

const router = Router();

router.get('/campus',asyncErrorHandler(validate(filterSchema)), asyncErrorHandler(getCampus));
router.get('/programs', asyncErrorHandler(getPrograms));
router.get('/acad-session', asyncErrorHandler(getSession));
router.get('/subject', asyncErrorHandler(getSubject));
router.get('/getCourseAnchor', asyncErrorHandler(getCourseAnchor));
router.get('/getProgramAnchor', asyncErrorHandler(getProgramAnchor));
router.get('/getAttendees', asyncErrorHandler(getAttendees));




export default router;
