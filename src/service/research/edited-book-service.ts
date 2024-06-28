import { getLogger } from '$config/logger-context';
import { getEditedBookPublicationModels, insertEditedBookPublicationModel, 
   updateEditedBookModel, deleteEditedBookModel
 } from '$model/edited-book-model';
import { paginationDefaultType } from 'types/db.default';


import { EditedBookPublicationDetails } from 'types/research.types';

export const getEditedBookPublicationService = async ({
   page,
   limit,
   sort,
   order,
   search,
   ...filters
}: paginationDefaultType) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT RESEARCH SERVICES');

   const data = await getEditedBookPublicationModels({
      page,
      limit,
      sort,
      order,
      search,
      ...filters,
   });

   return data;
};


export const insertEditedBookPublicationService = async (editedBookPublicationData: EditedBookPublicationDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');
    console.log('editedBookPublicationData ====>>>>>', editedBookPublicationData);
 
    const data = await insertEditedBookPublicationModel(editedBookPublicationData);
 
    return data;
 }; 

 export const updateEditedBookService = async (updateEditedBookPublicationData : EditedBookPublicationDetails) => {

   const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');
    console.log('updateEditedBookPublicationData ====>>>>>', updateEditedBookPublicationData);
 
    const data = await updateEditedBookModel(updateEditedBookPublicationData);
 
    return data;

 } 

 export const deleteEditedBookService = async(editedbookId : number) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');

   console.log('editedbookId in service ===>>>', editedbookId);

   const data = await deleteEditedBookModel(editedbookId);

   console.log('data ===>>>>>', data);
   return data

}