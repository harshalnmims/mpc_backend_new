import {
   iprPaginate,
   insertIpr,
   updateIPR,
   deleteIPR,
   iprRenderData,
   iprEditViewForm,
   viewIprForm,
   downloadIprFiles,
} from '$controller/research/IPR-controller';
import { validateUserSession } from '$middleware/auth.middleware';

import { asyncErrorHandler } from '$middleware/error.middleware';

import { Router } from 'express';

const iprRoutes = Router();

import multer from 'multer';

const upload = multer();

iprRoutes.get('/ipr-paginate',asyncErrorHandler(validateUserSession), asyncErrorHandler(iprPaginate));

iprRoutes.get('/ipr-render',asyncErrorHandler(validateUserSession), asyncErrorHandler(iprRenderData));

iprRoutes.get('/ipr-edit-view',asyncErrorHandler(validateUserSession), asyncErrorHandler(iprEditViewForm));

iprRoutes.post('/ipr-insert',asyncErrorHandler(validateUserSession), upload.array('supporting_documents'), asyncErrorHandler(insertIpr));

iprRoutes.post('/ipr-update',asyncErrorHandler(validateUserSession), upload.array('supporting_documents'), asyncErrorHandler(updateIPR));

iprRoutes.get('/ipr-form-view',asyncErrorHandler(validateUserSession), asyncErrorHandler(viewIprForm));

iprRoutes.get('/ipr-download-files',asyncErrorHandler(validateUserSession), asyncErrorHandler(downloadIprFiles));

iprRoutes.get('/ipr-delete',asyncErrorHandler(validateUserSession), asyncErrorHandler(deleteIPR));

export default iprRoutes;
