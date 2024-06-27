import { Router } from 'express';
import facultyRouter from './faculty';
import SpecialUserRouter from './special-user';
import supportAdminRouter from './support-admin';

const router = Router();

router.use('/faculty', facultyRouter);
router.use('/special-user', SpecialUserRouter);
router.use('/support-admin', supportAdminRouter);


export default router;
