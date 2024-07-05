import { getLogger } from '$config/logger-context';
// import { insertBookPublicationForm } from '$controller/research/book-publication-controller';
import { getBookPublication, insertBookPublicationModel, deleteBookPublicationModel,
    updateBookPublicationModel, getBookDetailsPaginateModel, bookPublicationEditViewModel
 } from '$model/book-publication-model';
import { paginationDefaultType } from 'types/db.default';
import {uploadFile} from '$middleware/fileupload.middleware';
import {renderModal,getNmimsAuthors,getAllAuthors,
   getSchool,getCampus
} from '$model/master-model';

import { BookPublicationDetails } from 'types/research.types';
import { bookPublication } from '$validations/research.valid';



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

export const insertBookPublicationService = async (bookPublicationData: BookPublicationDetails, documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined) => {
    const logger = getLogger();
   //  logger.info('INSIDE GET SUBJECT BOOK PUBLICATION  SERVICES');
    console.log('bookPublicationData ====>>>>>', bookPublicationData);
    let uploadDocuments = await uploadFile(documents);
    bookPublicationData.supporting_documents  = uploadDocuments.map(data =>  data);

    console.log('bookPublicationData with the file in service ====>>>>>', bookPublicationData);
 
    const data = await insertBookPublicationModel(bookPublicationData);
 
    return data;
 }; 


export const updateBookPublicationService = async (bookPublicationId : number, bookPublicationData : BookPublicationDetails, documents :  { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined) => {

    const logger = getLogger();

    let uploadDocuments = await uploadFile(documents);

    if (uploadDocuments.length > 0) {
      bookPublicationData.supporting_documents = uploadDocuments.map(data => data);
    } else {
      bookPublicationData.supporting_documents = [];
    }
    
    bookPublicationData.book_publication_id = bookPublicationId;
    console.log('upload documents ', uploadDocuments);
   

    
 
    const data = await updateBookPublicationModel(bookPublicationData);
 
    return data;
 };


 export const deleteBookPublicationService = async(bookPublicationId : number) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');

    console.log('bookPublicationId in service ===>>>', bookPublicationId);
 
    const data = await deleteBookPublicationModel(bookPublicationId);

    console.log('data ===>>>>>', data);
    
 }

export const bookPublicationEditViewService = async(bookPublicationId : number) => {

   console.log('bookPublicationId in services ===>>>>>', bookPublicationId);
   const bookPublicationData = await bookPublicationEditViewModel(bookPublicationId);
   const nmimsAuthors = await getNmimsAuthors();
   const allAuthors = await getAllAuthors();
   const school = await getSchool();
   const campus = await getCampus();
   return {
      bookPublicationData, nmimsAuthors,allAuthors,school,campus
   };
   
}

