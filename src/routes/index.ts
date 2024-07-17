import { Router } from 'express';
import facultyRouter from './faculty';
import SpecialUserRouter from './special-user';
import supportAdminRouter from './support-admin';

import journalDetailsRouter from './research-routes/journal-article-routes'
import iprRoutes from './research-routes/ipr-routes'
import bookPublicationRoutes from './research-routes/book-publication.routes'
import editedbookRoutes from './research-routes/edited-book-routes';
import bookChapterRoutes from './research-routes/book-chapter-routes';
import confereRoutes from './research-routes/conference-routes';
import indexRoutes from './research-routes/index'
import teachingRoutes from './research-routes/teachig-excellance-routes';
import brandingRoutes from './research-routes/branding.routes'
import meetingRoutes from './research-routes/meeting.routes'
import patentRoutes from './research-routes/patent-submission-routes';
import researchProjectRoutes from './research-routes/research-project-routes';

//ankit

const router = Router();

router.use('/faculty', facultyRouter);
router.use('/special-user', SpecialUserRouter);
router.use('/support-admin', supportAdminRouter);
router.use('/research-project', journalDetailsRouter);


router.use('/', iprRoutes);
router.use('/', journalDetailsRouter);
router.use('/', bookPublicationRoutes);
router.use('/', editedbookRoutes);
router.use('/', bookChapterRoutes);
router.use('/', confereRoutes);
router.use('/',indexRoutes);
router.use('/',teachingRoutes);
router.use('/',meetingRoutes);
router.use('/',brandingRoutes);
router.use('/', patentRoutes);
router.use('/', researchProjectRoutes);


export default router; 
