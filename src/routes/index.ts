import { Router } from 'express';
import facultyRouter from './faculty';
import SpecialUserRouter from './special-user';
import supportAdminRouter from './support-admin';

import journalDetailsRouter from './research-routes/journal-article-routes'
import bookPublicationRoutes from './research-routes/book-publication.routes'
import editedbookRoutes from './research-routes/edited-book-routes';
import bookChapterRoutes from './research-routes/book-chapter-routes';
import confereRoutes from './research-routes/conference-routes';

//ankit

const router = Router();

router.use('/faculty', facultyRouter);
router.use('/special-user', SpecialUserRouter);
router.use('/support-admin', supportAdminRouter);
router.use('/', journalDetailsRouter);
router.use('/', bookPublicationRoutes);
router.use('/', editedbookRoutes);
router.use('/', bookChapterRoutes);
router.use('/', confereRoutes);


export default router; 
