
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';
import journalDetailsRouter from './journal-article-routes';

import { validate } from '$middleware/validation.middleware';
import { filterSchema } from '$validations/base.valid';

const router = Router();

router.get('/journ')





export default router;
