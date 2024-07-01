import { insertEContent } from '$controller/research/e-content-controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const eContentRouter = Router();

eContentRouter.post('/insert-e-content', asyncErrorHandler(insertEContent));

export default eContentRouter;