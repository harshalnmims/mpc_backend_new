import { getResearchSeminar, insertResearchSeminarForm, updateResearchSeminarForm, 
    deleteResearchSeminarForm,researchSeminarPaginate,researchSeminarRenderController,
    researchSeminarViewController,researchSeminarUpdateViewCtrl,researchSeminarFilesCtrl
} from '$controller/research/research-seminar-controller'
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const researchSeminarRoutes = Router();
import multer from 'multer';
const upload = multer();

researchSeminarRoutes.get('/research-seminar', asyncErrorHandler(getResearchSeminar));
researchSeminarRoutes.post('/research-seminar-insert',upload.array("supporting_documents"), asyncErrorHandler(insertResearchSeminarForm));
researchSeminarRoutes.post('/research-seminar-update',upload.array("supporting_documents"), asyncErrorHandler(updateResearchSeminarForm));
researchSeminarRoutes.get('/research-seminar-delete', asyncErrorHandler(deleteResearchSeminarForm));
researchSeminarRoutes.get('/research-seminar-paginate',asyncErrorHandler(researchSeminarPaginate));
researchSeminarRoutes.get('/research-seminar-render-data',asyncErrorHandler(researchSeminarRenderController))
researchSeminarRoutes.get('/research-seminar-view-data',asyncErrorHandler(researchSeminarViewController))
researchSeminarRoutes.get('/research-seminar-update-view',asyncErrorHandler(researchSeminarUpdateViewCtrl))
researchSeminarRoutes.get('/research-seminar-download-files',asyncErrorHandler(researchSeminarFilesCtrl))


export default researchSeminarRoutes;