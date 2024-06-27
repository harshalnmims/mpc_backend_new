import { getLogger } from '$config/logger-context';
import { getBookPublication, insertBookPublicationModel, updateJournalArticleModel,
    deleteJournalArticleModel
 } from '$model/book-publication-model';
import { paginationDefaultType } from 'types/db.default';

import { journalArticleDetails } from 'types/research.types';

export const getBookPublicationService = async ({
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

export const insertBookPublicationService = async (journalDetails: journalArticleDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');
 
    const data = await insertJournalArticleModel(journalDetails);
 
    return data;
 }; 


 export const updateBookPublicationService = async (updateJournalDetails: journalArticleDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');
 
    const data = await updateJournalArticleModel(updateJournalDetails);
 
    return data;
 };


 export const deleteBookPublicationService = async(journalPaperId : number) => {
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