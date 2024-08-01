import {
   getResearchProjectForm,
   insertResearchForm,
   updateResearchForm,
   deleteResearchForm,
   researchProjectRenderData,
   researchProjectEditViewForm,
   viewResearchProjectForm,
   downloadResearchProjectFiles,
} from '$controller/research/research-project-controller';
import { validateUserSession } from '$middleware/auth.middleware';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const researchProjectRoutes = Router();

import multer from 'multer';
const upload = multer();

researchProjectRoutes.get('/research-project-paginate',asyncErrorHandler(validateUserSession), asyncErrorHandler(getResearchProjectForm));
researchProjectRoutes.get('/research-project-render',asyncErrorHandler(validateUserSession), asyncErrorHandler(researchProjectRenderData));
researchProjectRoutes.post(
   '/research-project-insert',asyncErrorHandler(validateUserSession),
   upload.array('supporting_documents'),
   asyncErrorHandler(insertResearchForm),
);
researchProjectRoutes.get('/research-project-edit-view-form',asyncErrorHandler(validateUserSession), asyncErrorHandler(researchProjectEditViewForm));

researchProjectRoutes.post(
   '/research-project-update',asyncErrorHandler(validateUserSession),
   upload.array('supporting_documents'),
   asyncErrorHandler(updateResearchForm),
);
researchProjectRoutes.get('/research-project-view',asyncErrorHandler(validateUserSession), asyncErrorHandler(viewResearchProjectForm));
researchProjectRoutes.get('/research-project-download-files',asyncErrorHandler(validateUserSession), asyncErrorHandler(downloadResearchProjectFiles));

researchProjectRoutes.get('/research-project-delete',asyncErrorHandler(validateUserSession), asyncErrorHandler(deleteResearchForm));

export default researchProjectRoutes;
