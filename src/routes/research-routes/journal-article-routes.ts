import { getJournalArticle, insertJournalArticleForm } from '$controller/research/journal-article-controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

const journalDetailsRouter = Router();

journalDetailsRouter.get('/insert', asyncErrorHandler(insertJournalArticleForm));


export default journalDetailsRouter;

