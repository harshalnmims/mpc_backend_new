import { getResearchAward, insertResearchAwardForm, updateResearchAwardForm,
    deleteResearchAwardForm,researchAwardPaginateController,researchAwardRenderController,
    researchAwardViewController
} from '$controller/research/research-award-controller'
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const researchAwardRoutes = Router();
import multer from 'multer';
const upload = multer();

researchAwardRoutes.get('/research-award', asyncErrorHandler(getResearchAward));
researchAwardRoutes.post('/research-award-insert',upload.array("supporting_documents"), asyncErrorHandler(insertResearchAwardForm));
researchAwardRoutes.post('/research-award-update', asyncErrorHandler(updateResearchAwardForm));
researchAwardRoutes.get('/research-award-delete', asyncErrorHandler(deleteResearchAwardForm));
researchAwardRoutes.get('/research-award-paginate', asyncErrorHandler(researchAwardPaginateController));
researchAwardRoutes.get('/research-award-render-data', asyncErrorHandler(researchAwardRenderController));
researchAwardRoutes.get('/research-award-view',asyncErrorHandler(researchAwardViewController))



export default researchAwardRoutes;