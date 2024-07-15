import {iprPaginate, insertIpr, updateIPR, deleteIPR, iprRenderData, iprEditViewForm } from '$controller/research/IPR-controller'

import { asyncErrorHandler } from '$middleware/error.middleware';

import { Router } from 'express';




const iprRoutes = Router();

import multer from 'multer';

const upload = multer();






iprRoutes.get('/ipr-paginate', asyncErrorHandler(iprPaginate));

iprRoutes.get('/ipr-render', asyncErrorHandler(iprRenderData));

iprRoutes.get('/ipr-edit-view', asyncErrorHandler(iprEditViewForm));

iprRoutes.post('/ipr-insert',upload.array("supporting_documents"), asyncErrorHandler(insertIpr));

iprRoutes.post('/update-ipr', asyncErrorHandler(updateIPR));

iprRoutes.post('/delete-ipr', asyncErrorHandler(deleteIPR));






export default iprRoutes;