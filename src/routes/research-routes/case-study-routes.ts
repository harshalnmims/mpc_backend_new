import {getCaseStudy, insertCaseStudyForm, updateCaseStudyForm,
    deleteCaseStudyForm,CaseStudyPaginateController,CaseStudyRenderController,CaseStudyViewController,
    CaseStudyUpdateViewController
} from '$controller/research/case-study-controller'
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const caseStudyRoutes = Router();
import multer from 'multer';
const upload = multer();

caseStudyRoutes.get('/case-study', asyncErrorHandler(getCaseStudy));
caseStudyRoutes.post('/case-study-insert',upload.array("supporting_documents"), asyncErrorHandler(insertCaseStudyForm));
caseStudyRoutes.post('/case-study-update',upload.array("supporting_documents"), asyncErrorHandler(updateCaseStudyForm));
caseStudyRoutes.get('/case-study-delete', asyncErrorHandler(deleteCaseStudyForm));
caseStudyRoutes.get('/case-study-paginate',asyncErrorHandler(CaseStudyPaginateController));
caseStudyRoutes.get('/case-study-render-data',asyncErrorHandler(CaseStudyRenderController));
caseStudyRoutes.get('/case-study-view-data',asyncErrorHandler(CaseStudyViewController));
caseStudyRoutes.get('/case-study-update-view',asyncErrorHandler(CaseStudyUpdateViewController));




export default caseStudyRoutes;