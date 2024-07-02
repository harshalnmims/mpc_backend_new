import { getResearchAward, insertResearchAwardForm, updateResearchAwardForm,
    deleteResearchAwardForm
} from '$controller/research/research-award-controller'
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const researchAwardRoutes = Router();

researchAwardRoutes.get('/research-award', asyncErrorHandler(getResearchAward));
researchAwardRoutes.post('/research-award-insert', asyncErrorHandler(insertResearchAwardForm));
researchAwardRoutes.post('/research-award-update', asyncErrorHandler(updateResearchAwardForm));
researchAwardRoutes.post('/research-award-delete', asyncErrorHandler(deleteResearchAwardForm));



export default researchAwardRoutes;