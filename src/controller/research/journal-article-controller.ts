import { getLogger } from '$config/logger-context';
import {
    getJournalArticleService, insertJournalArticleService
} from '$service/research/journal-article-service';
import { Request, Response, NextFunction } from 'express';


export const getJournalArticle = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT RESEARCH CONTROLLER');
 
    const {
       page = 1,
       limit = 10,
       sort = '',
       order = 'desc',
       search = '',
       ...filters
    } = { ...req.body, ...req.params, ...req.query };
 
    const data = await getJournalArticleService({
       page,
       limit,
       search,
       sort,
       order,
       filters,
    });
 
    return res.status(200).json(data);
 };


 export const insertJournalArticleForm = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT FACULTY CONTROLLER');
 
    const journalDetails = { ...req.body, ...req.params, ...req.query };
    const data = await insertJournalArticleService(journalDetails);
 
    return res.status(200).json(data);
 };
