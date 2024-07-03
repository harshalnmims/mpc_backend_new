import { insertIpr, updateIPR, deleteIPR } from '$controller/research/IPR-controller'
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const iprRoutes = Router();

iprRoutes.post('/insert-ipr', asyncErrorHandler(insertIpr));
iprRoutes.post('/update-ipr', asyncErrorHandler(updateIPR));
iprRoutes.post('/delete-ipr', asyncErrorHandler(deleteIPR));


export default iprRoutes;