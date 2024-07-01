import { getJournalArticle, insertJournalArticleForm , updateJournalArticleForm, 
    deleteJournalArticleForm,journalPaginate,journalRenderData
} from '$controller/research/journal-article-controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';
import { validate } from '$middleware/validation.middleware';
import { journalPaper } from '$validations/research.valid';


const journalDetailsRouter = Router();
import multer from 'multer';
const upload = multer();

journalDetailsRouter.post('/journal-article-insert' ,asyncErrorHandler(validate(journalPaper)),asyncErrorHandler(insertJournalArticleForm));
journalDetailsRouter.post('/journal-article-update', asyncErrorHandler(updateJournalArticleForm));
journalDetailsRouter.post('/journal-article-delete', asyncErrorHandler(deleteJournalArticleForm));
journalDetailsRouter.get('/journal-paginate',asyncErrorHandler(journalPaginate));
journalDetailsRouter.get('/journal-render-data',asyncErrorHandler(journalRenderData));

export default journalDetailsRouter;

