import {
  masterDataPaginate, renderMasterData, masterDataScrollPaginate, insertMasterInput,
  masterDataEditViewForm, updateMasterInput
 } from '$controller/research/master-data-controller';
 
 import { asyncErrorHandler } from '$middleware/error.middleware';
 
 import { Router } from 'express';
 
 const masterDataRoutes = Router();
 
 import multer from 'multer';
 
 const upload = multer();


 
 masterDataRoutes.get('/master-input-data-paginate', asyncErrorHandler(masterDataPaginate));
 masterDataRoutes.get('/master-input-data-scroll-paginate', asyncErrorHandler(masterDataScrollPaginate));
 masterDataRoutes.get('/master-input-data-render', asyncErrorHandler(renderMasterData));
 masterDataRoutes.post('/master-input-data-insert', asyncErrorHandler(insertMasterInput));
 masterDataRoutes.get('/master-input-data-edit-view', asyncErrorHandler(masterDataEditViewForm));
 masterDataRoutes.post('/master-input-data-update', asyncErrorHandler(updateMasterInput));

 export default masterDataRoutes;