import { getLogger } from '$config/logger-context';
// import { insertBookPublicationForm } from '$controller/research/book-publication-controller';
import { getBookPublication, insertBookPublicationModel, deleteBookPublicationModel,
    updateBookPublicationModel
 } from '$model/book-publication-model';
import { paginationDefaultType } from 'types/db.default';

import { BookPublicationDetails } from 'types/research.types';

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

   const data = await getBookPublication({
      page,
      limit,
      sort,
      order,
      search,
      ...filters,
   });

   return data;
};

export const insertBookPublicationService = async (bookPublicationData: BookPublicationDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');
    console.log('bookPublicationData ====>>>>>', bookPublicationData);
 
    const data = await insertBookPublicationModel(bookPublicationData);
 
    return data;
 }; 


 export const updateBookPublicationService = async (updateJournalDetails: BookPublicationDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');
 
    const data = await updateBookPublicationModel(updateJournalDetails);
 
    return data;
 };


 export const deleteBookPublicationService = async(journalPaperId : number) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');

    console.log('journalPaperId in service ===>>>', journalPaperId);
 
    const data = await deleteBookPublicationModel(journalPaperId);

    console.log('data ===>>>>>', data);
    return {
        status : data.status,
        message : data.message
    };

 }