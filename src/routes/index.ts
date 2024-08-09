import { Router } from 'express';
// import facultyRouter from './faculty';
// import SpecialUserRouter from './special-user';

import journalDetailsRouter from './research-routes/journal-article-routes';
import iprRoutes from './research-routes/ipr-routes';
import bookPublicationRoutes from './research-routes/book-publication.routes';
import editedbookRoutes from './research-routes/edited-book-routes';
import bookChapterRoutes from './research-routes/book-chapter-routes';
import confereRoutes from './research-routes/conference-routes';
import indexRoutes from './research-routes/index';
import teachingRoutes from './research-routes/teachig-excellance-routes';
import brandingRoutes from './research-routes/branding.routes'
import meetingRoutes from './research-routes/meeting.routes'
import caseStudyRoutes from './research-routes/case-study-routes';
import researchSeminarRoutes from './research-routes/research-seminar-routes';
import eContentRouter from './research-routes/e-content-routes';
import researchAwardRoutes from './research-routes/research-award-routes';
import facultyRoutes from './research-routes/faculty-routes'
import loginRoutes from './research-routes/login-routes';
import patentRoutes from './research-routes/patent-submission-routes';
import researchProjectRoutes from './research-routes/research-project-routes';
import masterDataRoutes from './research-routes/master-data-routes';
import adminRouter from './research-routes/admin-routes';

const router = Router();

// router.use('/faculty', facultyRouter);
// router.use('/special-user', SpecialUserRouter);
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
router.use('/',caseStudyRoutes);
router.use('/',researchSeminarRoutes);
router.use('/',eContentRouter);
router.use('/',researchAwardRoutes);
router.use('/',facultyRoutes);
router.use('/',loginRoutes);
router.use('/', patentRoutes);
router.use('/', researchProjectRoutes);
router.use('/', masterDataRoutes);
router.use('/',adminRouter);

export default router;
