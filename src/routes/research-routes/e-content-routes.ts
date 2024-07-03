import { insertEContent, updateEContent, deleteEContent } from '$controller/research/e-content-controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const eContentRouter = Router();

eContentRouter.post('/insert-e-content', asyncErrorHandler(insertEContent));
eContentRouter.post('/update-e-content', asyncErrorHandler(updateEContent));
eContentRouter.post('/delete-e-content', asyncErrorHandler(deleteEContent))

export default eContentRouter;