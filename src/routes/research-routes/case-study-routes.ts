import {getCaseStudy, insertCaseStudyForm, updateCaseStudyForm,
    deleteCaseStudyForm,CaseStudyPaginateController,CaseStudyRenderController,CaseStudyViewController,
    CaseStudyUpdateViewController,downloadFilesController
} from '$controller/research/case-study-controller'
import { validateUserSession } from '$middleware/auth.middleware';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const caseStudyRoutes = Router();
import multer from 'multer';
const upload = multer();

caseStudyRoutes.get('/case-study', asyncErrorHandler(validateUserSession),asyncErrorHandler(getCaseStudy));
caseStudyRoutes.post('/case-study-insert',asyncErrorHandler(validateUserSession),upload.array("supporting_documents"), asyncErrorHandler(insertCaseStudyForm));
caseStudyRoutes.post('/case-study-update',asyncErrorHandler(validateUserSession),upload.array("supporting_documents"), asyncErrorHandler(updateCaseStudyForm));
caseStudyRoutes.get('/case-study-delete',asyncErrorHandler(validateUserSession), asyncErrorHandler(deleteCaseStudyForm));
caseStudyRoutes.get('/case-study-paginate',asyncErrorHandler(validateUserSession),asyncErrorHandler(CaseStudyPaginateController));
caseStudyRoutes.get('/case-study-render-data',asyncErrorHandler(validateUserSession),asyncErrorHandler(CaseStudyRenderController));
caseStudyRoutes.get('/case-study-view-data',asyncErrorHandler(validateUserSession),asyncErrorHandler(CaseStudyViewController));
caseStudyRoutes.get('/case-study-update-view',asyncErrorHandler(validateUserSession),asyncErrorHandler(CaseStudyUpdateViewController));
caseStudyRoutes.get('/case-study-download-files',asyncErrorHandler(validateUserSession),asyncErrorHandler(downloadFilesController));



export default caseStudyRoutes;