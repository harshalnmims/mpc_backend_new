import { insertIpr } from '$controller/research/IPR-controller'
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const iprRoutes = Router();

iprRoutes.post('/insert-ipr', asyncErrorHandler(insertIpr));


export default iprRoutes;