import {
  masterDataPaginate, renderMasterData, masterDataScrollPaginate, insertMasterInput,
  masterDataEditViewForm, updateMasterInput, viewMasterDataForm, deleteMasterDataForm
 } from '$controller/research/master-data-controller';
import { validateUserSession } from '$middleware/auth.middleware';
 
 import { asyncErrorHandler } from '$middleware/error.middleware';
 
 import { Router } from 'express';
 
 const masterDataRoutes = Router();
 
 import multer from 'multer';
 
 const upload = multer();


 
 masterDataRoutes.get('/master-input-data-paginate',asyncErrorHandler(validateUserSession), asyncErrorHandler(masterDataPaginate));
 masterDataRoutes.get('/master-input-data-scroll-paginate',asyncErrorHandler(validateUserSession), asyncErrorHandler(masterDataScrollPaginate));
 masterDataRoutes.get('/master-input-data-render',asyncErrorHandler(validateUserSession), asyncErrorHandler(renderMasterData));
 masterDataRoutes.post('/master-input-data-insert',asyncErrorHandler(validateUserSession), asyncErrorHandler(insertMasterInput));
 masterDataRoutes.get('/master-input-data-edit-view',asyncErrorHandler(validateUserSession), asyncErrorHandler(masterDataEditViewForm));
 masterDataRoutes.post('/master-input-data-update',asyncErrorHandler(validateUserSession), asyncErrorHandler(updateMasterInput));
 masterDataRoutes.get('/master-input-data-form-view',asyncErrorHandler(validateUserSession), asyncErrorHandler(viewMasterDataForm));
 masterDataRoutes.get('/master-input-data-delete',asyncErrorHandler(validateUserSession), asyncErrorHandler(deleteMasterDataForm));

 export default masterDataRoutes;