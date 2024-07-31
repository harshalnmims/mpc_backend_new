import { getLogger } from '$config/logger-context';
// import { insertBookPublicationForm } from '$controller/research/book-publication-controller';
import {
   getBookPublication,
   insertBookPublicationModel,
   deleteBookPublicationModel,
   updateBookPublicationModel,
   getBookDetailsPaginateModel,
   bookPublicationEditViewModel,
   bookPublicationFormviewModel,
   bookPublicationFiles,
} from '$model/book-publication-model';
import { paginationDefaultType } from 'types/db.default';
import {getUploadedFile, uploadFile} from '$middleware/fileupload.middleware';
import {renderModal,getNmimsAuthors,getAllAuthors,
   getSchool,getCampus,getMasterAllAuthors,getMasterNmimsAuthors
} from '$model/master-model';

import { Request, Response } from 'express';

import { BookPublicationDetails } from 'types/research.types';
import { bookPublication } from '$validations/research.valid';
import { downloadFile } from '$middleware/fileupload.middleware';

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

export const renderBookPublicationService = async () => {
   const nmimsAuthors = await getMasterNmimsAuthors();
   const allAuthors = await getMasterAllAuthors();
   const school = await getSchool();
   const campus = await getCampus();
   return {
      nmimsAuthors,
      allAuthors,
      school,
      campus,
   };
};

export const insertBookPublicationService = async (bookPublicationData: BookPublicationDetails, documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined, username: any) => {
    const logger = getLogger();
   //  logger.info('INSIDE GET SUBJECT BOOK PUBLICATION  SERVICES');
   console.log('bookPublicationData ====>>>>>', bookPublicationData);
   let uploadDocuments = await uploadFile(documents);
   bookPublicationData.supporting_documents = uploadDocuments.map((data) => data);

    console.log('bookPublicationData with the file in service ====>>>>>', bookPublicationData);
 
    const data = await insertBookPublicationModel(bookPublicationData,username);
 
    return data;
 }; 



export const updateBookPublicationService = async (bookPublicationId : number, bookPublicationData : BookPublicationDetails, documents :  { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined,username:string) => {

    const logger = getLogger();

   let uploadDocuments = await uploadFile(documents);

   if (uploadDocuments.length > 0) {
      bookPublicationData.supporting_documents = uploadDocuments.map((data) => data);
   } else {
      bookPublicationData.supporting_documents = [];
    }
    
    bookPublicationData.book_publication_id = bookPublicationId;
    console.log('upload documents ', uploadDocuments);
   

    
 
    const data = await updateBookPublicationModel(bookPublicationData,username);
 
    return data;
 };


 export const deleteBookPublicationService = async(bookPublicationId : number,username:string) => {
    const logger = getLogger();

    console.log('bookPublicationId in service ===>>>', bookPublicationId);
 
    const data = await deleteBookPublicationModel(bookPublicationId,username);

   return data;
};

export const bookPublicationEditViewService = async (bookPublicationId: number) => {
   console.log('bookPublicationId in services ===>>>>>', bookPublicationId);
   const bookPublicationData = await bookPublicationEditViewModel(bookPublicationId);
   const nmimsAuthors = await getMasterNmimsAuthors();
   const allAuthors = await getMasterAllAuthors();
   const school = await getSchool();
   const campus = await getCampus();
   return {
      bookPublicationData,
      nmimsAuthors,
      allAuthors,
      school,
      campus,
   };
};

export const  bookPublicationFormViewService = async(bookPublicationId : number) => {
   
   const bookPublicationFilesData = await bookPublicationFiles(bookPublicationId);
   const filesUrls = await getUploadedFile(bookPublicationFilesData);
   const data = await bookPublicationFormviewModel(bookPublicationId);
   return {files : filesUrls , bookPublicationData : data}
}

export const bookPublicationDownloadFileService = async (publicationId: number, req: Request, res: Response) => {
   // const logger = getLogger();

   const data = await bookPublicationFiles(publicationId);

   let files: string[] = data.map((dt) => dt.document_name);
   await downloadFile(files, req, res);
};
