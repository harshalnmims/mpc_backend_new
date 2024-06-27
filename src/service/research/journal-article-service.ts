import { getLogger } from '$config/logger-context';
import { getJournalArticlePublished, insertJournalArticleModel } from '$model/journal-article-model';
import { paginationDefaultType } from 'types/db.default';

import { journalArticleDetails } from 'types/research.types';

export const getJournalArticleService = async ({
   page,
   limit,
   sort,
   order,
   search,
   ...filters
}: paginationDefaultType) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT RESEARCH SERVICES');

   const data = await getJournalArticlePublished({
      page,
      limit,
      sort,
      order,
      search,
      ...filters,
   });

   return data;
};

export const insertJournalArticleService = async (journalDetails: journalArticleDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');
 
    const data = await insertJournalArticleModel(journalDetails);
 
    return data;
 };