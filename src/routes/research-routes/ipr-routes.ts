import {iprPaginate, insertIpr, updateIPR, deleteIPR, iprRenderData, iprEditViewForm ,
    viewIprForm, downloadIprFiles
} from '$controller/research/IPR-controller'

import { asyncErrorHandler } from '$middleware/error.middleware';

import { Router } from 'express';




const iprRoutes = Router();

import multer from 'multer';

const upload = multer();






iprRoutes.get('/ipr-paginate', asyncErrorHandler(iprPaginate));

iprRoutes.get('/ipr-render', asyncErrorHandler(iprRenderData));

iprRoutes.get('/ipr-edit-view', asyncErrorHandler(iprEditViewForm));

iprRoutes.post('/ipr-insert',upload.array("supporting_documents"), asyncErrorHandler(insertIpr));

iprRoutes.post('/ipr-update', upload.array("supporting_documents"),asyncErrorHandler(updateIPR));

iprRoutes.get('/ipr-form-view', asyncErrorHandler(viewIprForm));

iprRoutes.get('/ipr-download-files', asyncErrorHandler(downloadIprFiles));

iprRoutes.post('/ipr-delete', asyncErrorHandler(deleteIPR));






export default iprRoutes;