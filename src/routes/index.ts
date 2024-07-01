import { Router } from 'express';
import facultyRouter from './faculty';
import SpecialUserRouter from './special-user';
import supportAdminRouter from './support-admin';

import journalDetailsRouter from './research-routes/journal-article-routes'
import iprRoutes from './research-routes/ipr-routes'
import bookPublicationRoutes from './research-routes/book-publication.routes'
import eContentRoute from './research-routes/e-content-routes'

//ankit

const router = Router();

router.use('/faculty', facultyRouter);
router.use('/special-user', SpecialUserRouter);
router.use('/support-admin', supportAdminRouter);
router.use('/research-project', journalDetailsRouter);
router.use('/', iprRoutes);
router.use('/', journalDetailsRouter);
router.use('/', bookPublicationRoutes);
router.use('/', eContentRoute);


export default router; 
