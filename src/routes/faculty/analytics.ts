import {
   analyticsAllPrograms,
   analyticsAllProgramsById,
   campusByProgram,
   schoolList,
   subjectListByProgramAndYear,
} from '$controller/faculty/analytics.controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const Analyticsrouter = Router();

Analyticsrouter.get('/program-data-by-year', asyncErrorHandler(analyticsAllPrograms));
Analyticsrouter.get('/program-data-by-id', asyncErrorHandler(analyticsAllProgramsById));
Analyticsrouter.get('/subject-data-by-program', asyncErrorHandler(subjectListByProgramAndYear));
Analyticsrouter.get('/campus-data-by-program', asyncErrorHandler(campusByProgram));
Analyticsrouter.get('/school-list', asyncErrorHandler(schoolList));

export default Analyticsrouter;