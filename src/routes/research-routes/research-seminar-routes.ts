import { getResearchSeminar, insertResearchSeminarForm, updateResearchSeminarForm, 
    deleteResearchSeminarForm,researchSeminarPaginate,researchSeminarRenderController,
    researchSeminarViewController,researchSeminarUpdateViewCtrl,researchSeminarFilesCtrl
} from '$controller/research/research-seminar-controller'
import { validateUserSession } from '$middleware/auth.middleware';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const researchSeminarRoutes = Router();
import multer from 'multer';
const upload = multer();

researchSeminarRoutes.get('/research-seminar',asyncErrorHandler(validateUserSession), asyncErrorHandler(getResearchSeminar));
researchSeminarRoutes.post('/research-seminar-insert',asyncErrorHandler(validateUserSession),upload.array("supporting_documents"), asyncErrorHandler(insertResearchSeminarForm));
researchSeminarRoutes.post('/research-seminar-update',asyncErrorHandler(validateUserSession),upload.array("supporting_documents"), asyncErrorHandler(updateResearchSeminarForm));
researchSeminarRoutes.get('/research-seminar-delete',asyncErrorHandler(validateUserSession), asyncErrorHandler(deleteResearchSeminarForm));
researchSeminarRoutes.get('/research-seminar-paginate',asyncErrorHandler(validateUserSession),asyncErrorHandler(researchSeminarPaginate));
researchSeminarRoutes.get('/research-seminar-render-data',asyncErrorHandler(validateUserSession),asyncErrorHandler(researchSeminarRenderController))
researchSeminarRoutes.get('/research-seminar-view-data',asyncErrorHandler(validateUserSession),asyncErrorHandler(researchSeminarViewController))
researchSeminarRoutes.get('/research-seminar-update-view',asyncErrorHandler(validateUserSession),asyncErrorHandler(researchSeminarUpdateViewCtrl))
researchSeminarRoutes.get('/research-seminar-download-files',asyncErrorHandler(validateUserSession),asyncErrorHandler(researchSeminarFilesCtrl))


export default researchSeminarRoutes;