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
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const researchProjectRoutes = Router();

import multer from 'multer';
const upload = multer();

researchProjectRoutes.get('/research-project-paginate', asyncErrorHandler(getResearchProjectForm));
researchProjectRoutes.get('/research-project-render', asyncErrorHandler(researchProjectRenderData));
researchProjectRoutes.post(
   '/research-project-insert',
   upload.array('supporting_documents'),
   asyncErrorHandler(insertResearchForm),
);
researchProjectRoutes.get('/research-project-edit-view-form', asyncErrorHandler(researchProjectEditViewForm));

researchProjectRoutes.post(
   '/research-project-update',
   upload.array('supporting_documents'),
   asyncErrorHandler(updateResearchForm),
);
researchProjectRoutes.get('/research-project-view', asyncErrorHandler(viewResearchProjectForm));
researchProjectRoutes.get('/research-project-download-files', asyncErrorHandler(downloadResearchProjectFiles));

researchProjectRoutes.post('/research-project-delete', asyncErrorHandler(deleteResearchForm));

export default researchProjectRoutes;
