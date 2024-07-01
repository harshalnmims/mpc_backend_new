import {
   insertMasterForm,
   updateMasterForm,
   viewMasterForm,
   viewMasterFormList,
} from '$controller/faculty/master.controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
// import { validate } from '$middleware/validation.middleware';
import { CreateMeetingschema } from '$validations/base.valid';
import { Router } from 'express';

const materFormRouter = Router();

// materFormRouter.get('/insert-master-form',asyncErrorHandler(validate(CreateMeetingschema)) ,asyncErrorHandler(insertMasterForm));
materFormRouter.get('/view-master-form', asyncErrorHandler(viewMasterForm));
materFormRouter.get('/view-master-form-list', asyncErrorHandler(viewMasterFormList));
materFormRouter.get('/update-master-form', asyncErrorHandler(updateMasterForm));

export default materFormRouter;
