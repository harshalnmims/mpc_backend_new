import { getResearchProjectForm, insertResearchForm, updateResearchForm, 
    deleteResearchForm
} from '$controller/research/research-project-controller'
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const researchProjectRoutes = Router();

researchProjectRoutes.get('/research-project', asyncErrorHandler(getResearchProjectForm));
researchProjectRoutes.post('/research-project-insert', asyncErrorHandler(insertResearchForm));
researchProjectRoutes.post('/research-project-update', asyncErrorHandler(updateResearchForm));
researchProjectRoutes.post('/research-project-delete', asyncErrorHandler(deleteResearchForm));



export default researchProjectRoutes;