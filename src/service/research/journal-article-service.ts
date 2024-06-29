import { getLogger } from '$config/logger-context';
import { getJournalArticlePublished, insertJournalArticleModel, updateJournalArticleModel,
    deleteJournalArticleModel,journalPaginateModal
 } from '$model/journal-article-model';
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

export const journalPaginateService = async ({
   page,
   limit,
   sort,
   order,
   search,
   ...filters
}: paginationDefaultType) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT RESEARCH SERVICES ');

   const data = await journalPaginateModal({
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


 export const updateJournalArticleService = async (updateJournalDetails: journalArticleDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');
 
    const data = await updateJournalArticleModel(updateJournalDetails);
 
    return data;
 };


 export const deleteJournalArticleService = async(journalPaperId : number) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');

    console.log('journalPaperId in service ===>>>', journalPaperId);
 
    const data = await deleteJournalArticleModel(journalPaperId);

    console.log('data ===>>>>>', data);
    return {
        status : data.status,
        message : data.message
    };

 }