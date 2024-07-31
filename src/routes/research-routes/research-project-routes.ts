import { getResearchProjectForm, insertResearchForm, updateResearchForm, 
    deleteResearchForm
} from '$controller/research/research-project-controller'
import { validateUserSession } from '$middleware/auth.middleware';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const researchProjectRoutes = Router();

researchProjectRoutes.get('/research-project',asyncErrorHandler(validateUserSession), asyncErrorHandler(getResearchProjectForm));
researchProjectRoutes.post('/research-project-insert',asyncErrorHandler(validateUserSession), asyncErrorHandler(insertResearchForm));
researchProjectRoutes.post('/research-project-update',asyncErrorHandler(validateUserSession), asyncErrorHandler(updateResearchForm));
researchProjectRoutes.post('/research-project-delete',asyncErrorHandler(validateUserSession), asyncErrorHandler(deleteResearchForm));



export default researchProjectRoutes;