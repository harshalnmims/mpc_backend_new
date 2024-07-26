import { getJournalArticle, insertJournalArticleForm , updateJournalArticleForm, 
    deleteJournalArticleForm,journalPaginate,journalRenderData,journalViewController,journalDownloadFile,journalUpdateViewController,
} from '$controller/research/journal-article-controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';
// import { validate } from '$middleware/validation.middleware';
import { journalPaper } from '$validations/research.valid';


const journalDetailsRouter = Router();
import multer from 'multer';
import { validateUserSession } from '$middleware/auth.middleware';
const upload = multer();

journalDetailsRouter.post('/journal-article-insert',asyncErrorHandler(validateUserSession),upload.array("supporting_documents"),asyncErrorHandler(insertJournalArticleForm));
journalDetailsRouter.post('/journal-article-update',asyncErrorHandler(validateUserSession),upload.array("supporting_documents"), asyncErrorHandler(updateJournalArticleForm));
journalDetailsRouter.get('/journal-article-delete',asyncErrorHandler(validateUserSession), asyncErrorHandler(deleteJournalArticleForm));
journalDetailsRouter.get('/journal-paginate',asyncErrorHandler(validateUserSession),asyncErrorHandler(journalPaginate));
journalDetailsRouter.get('/journal-render-data',asyncErrorHandler(validateUserSession),asyncErrorHandler(journalRenderData));
journalDetailsRouter.get('/journal-view-data',asyncErrorHandler(validateUserSession),asyncErrorHandler(journalViewController));
journalDetailsRouter.get('/journal-download-files',asyncErrorHandler(validateUserSession),asyncErrorHandler(journalDownloadFile))
journalDetailsRouter.get('/journal-update-view',asyncErrorHandler(validateUserSession),asyncErrorHandler(journalUpdateViewController))



export default journalDetailsRouter;

