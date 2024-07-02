import {getCaseStudy, insertCaseStudyForm, updateCaseStudyForm,
    deleteCaseStudyForm
} from '$controller/research/case-study-controller'
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const caseStudyRoutes = Router();

caseStudyRoutes.get('/case-study', asyncErrorHandler(getCaseStudy));
caseStudyRoutes.post('/case-study-insert', asyncErrorHandler(insertCaseStudyForm));
caseStudyRoutes.post('/case-study-update', asyncErrorHandler(updateCaseStudyForm));
caseStudyRoutes.post('/case-study-delete', asyncErrorHandler(deleteCaseStudyForm));



export default caseStudyRoutes;