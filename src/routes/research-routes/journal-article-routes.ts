import { getJournalArticle, insertJournalArticleForm , updateJournalArticleForm, 
    deleteJournalArticleForm
} from '$controller/research/journal-article-controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const journalDetailsRouter = Router();

journalDetailsRouter.post('/journal-article-insert', asyncErrorHandler(insertJournalArticleForm));
journalDetailsRouter.post('/journal-article-update', asyncErrorHandler(updateJournalArticleForm));
journalDetailsRouter.post('/journal-article-delete', asyncErrorHandler(deleteJournalArticleForm));


export default journalDetailsRouter;

