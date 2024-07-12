import { getResearchSeminar, insertResearchSeminarForm, updateResearchSeminarForm, 
    deleteResearchSeminarForm,researchSeminarPaginate
} from '$controller/research/research-seminar-controller'
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const researchSeminarRoutes = Router();

researchSeminarRoutes.get('/research-seminar', asyncErrorHandler(getResearchSeminar));
researchSeminarRoutes.post('/research-seminar-insert', asyncErrorHandler(insertResearchSeminarForm));
researchSeminarRoutes.post('/research-seminar-update', asyncErrorHandler(updateResearchSeminarForm));
researchSeminarRoutes.post('/research-seminar-delete', asyncErrorHandler(deleteResearchSeminarForm));
researchSeminarRoutes.get('/research-seminar-paginate',asyncErrorHandler(researchSeminarPaginate));



export default researchSeminarRoutes;