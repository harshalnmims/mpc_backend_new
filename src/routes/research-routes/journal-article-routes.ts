import { getJournalArticle, insertJournalArticleForm , updateJournalArticleForm, 
    deleteJournalArticleForm,journalPaginate,journalRenderData,journalViewController,journalDownloadFile,journalUpdateViewController
} from '$controller/research/journal-article-controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';
// import { validate } from '$middleware/validation.middleware';
import { journalPaper } from '$validations/research.valid';


const journalDetailsRouter = Router();
import multer from 'multer';
const upload = multer();

journalDetailsRouter.post('/journal-article-insert',upload.array("supporting_documents"),asyncErrorHandler(insertJournalArticleForm));
journalDetailsRouter.post('/journal-article-update',upload.array("supporting_documents"), asyncErrorHandler(updateJournalArticleForm));
journalDetailsRouter.get('/journal-article-delete', asyncErrorHandler(deleteJournalArticleForm));
journalDetailsRouter.get('/journal-paginate',asyncErrorHandler(journalPaginate));
journalDetailsRouter.get('/journal-render-data',asyncErrorHandler(journalRenderData));
journalDetailsRouter.get('/journal-view-data',asyncErrorHandler(journalViewController));
journalDetailsRouter.get('/journal-download-files',asyncErrorHandler(journalDownloadFile))
journalDetailsRouter.get('/journal-update-view',asyncErrorHandler(journalUpdateViewController))



export default journalDetailsRouter;

