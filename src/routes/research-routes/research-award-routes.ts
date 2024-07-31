import { getResearchAward, insertResearchAwardForm, updateResearchAwardForm,
    deleteResearchAwardForm,researchAwardPaginateController,researchAwardRenderController,
    researchAwardViewController,researchAwardUpdViewController,researchAwardDownloadFiles
} from '$controller/research/research-award-controller'
import { validateUserSession } from '$middleware/auth.middleware';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const researchAwardRoutes = Router();
import multer from 'multer';
const upload = multer();

researchAwardRoutes.get('/research-award',asyncErrorHandler(validateUserSession), asyncErrorHandler(getResearchAward));
researchAwardRoutes.post('/research-award-insert',asyncErrorHandler(validateUserSession),upload.array("supporting_documents"), asyncErrorHandler(insertResearchAwardForm));
researchAwardRoutes.post('/research-award-update',asyncErrorHandler(validateUserSession),upload.array("supporting_documents"), asyncErrorHandler(updateResearchAwardForm));
researchAwardRoutes.get('/research-award-delete', asyncErrorHandler(validateUserSession),asyncErrorHandler(deleteResearchAwardForm));
researchAwardRoutes.get('/research-award-paginate', asyncErrorHandler(validateUserSession),asyncErrorHandler(researchAwardPaginateController));
researchAwardRoutes.get('/research-award-render-data', asyncErrorHandler(validateUserSession),asyncErrorHandler(researchAwardRenderController));
researchAwardRoutes.get('/research-award-view',asyncErrorHandler(validateUserSession),asyncErrorHandler(researchAwardViewController));
researchAwardRoutes.get('/research-award-update-view',asyncErrorHandler(validateUserSession),asyncErrorHandler(researchAwardUpdViewController));
researchAwardRoutes.get('/research-award-download-files',asyncErrorHandler(validateUserSession),asyncErrorHandler(researchAwardDownloadFiles));



export default researchAwardRoutes;