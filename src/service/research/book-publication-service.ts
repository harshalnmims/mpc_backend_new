import { getLogger } from '$config/logger-context';
// import { insertBookPublicationForm } from '$controller/research/book-publication-controller';
import { getBookPublication, insertBookPublicationModel, deleteBookPublicationModel,
    updateBookPublicationModel, getBookDetailsPaginateModel
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

   const data = await getBookDetailsPaginateModel({
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
    logger.info('INSIDE GET SUBJECT BOOK PUBLICATION  SERVICES');
    console.log('bookPublicationData ====>>>>>', bookPublicationData);
 
    const data = await insertBookPublicationModel(bookPublicationData);
 
    return data;
 }; 


 export const updateBookPublicationService = async (updateBookDetails: BookPublicationDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET updateBookPublicationService SERVICES');
    console.log('updateBookDetails ===>>>>>', updateBookDetails);
 
    const data = await updateBookPublicationModel(updateBookDetails);
 
    return data;
 };


 export const deleteBookPublicationService = async(bookPublicationId : number) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');

    console.log('bookPublicationId in service ===>>>', bookPublicationId);
 
    const data = await deleteBookPublicationModel(bookPublicationId);

    console.log('data ===>>>>>', data);
    
 }