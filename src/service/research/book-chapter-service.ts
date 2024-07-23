import { getLogger } from '$config/logger-context';
import {
   getBookChapterPublication,
   insertBookChapterModel,
   updateBookChapterModel,
   deleteBookChapterModel,
   booChapterEditViewModel,
   bookChapterPublicationFormviewModel,
   bookChapterPublicationFiles,
} from '$model/book-chapter-model';
import exp from 'constants';
import { paginationDefaultType } from 'types/db.default';
import {getUploadedFile, uploadFile} from '$middleware/fileupload.middleware';
import {renderModal,getNmimsAuthors,getAllAuthors,
   getSchool,getCampus,
   getEditors,getMasterAllAuthors,getMasterNmimsAuthors
} from '$model/master-model';

import { downloadFile } from '$middleware/fileupload.middleware';
import { Request, Response } from 'express';

import { bookChapterDetails } from 'types/research.types';

export const getBookChapterService = async ({
   page,
   limit,
   sort,
   order,
   search,
   ...filters
}: paginationDefaultType) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT RESEARCH SERVICES');

   const data = await getBookChapterPublication({
      page,
      limit,
      sort,
      order,
      search,
      ...filters,
   });

   return data;
};

export const renderBookChapterLists = async () => {
   const nmimsAuthors = await getMasterNmimsAuthors();
   const allAuthors = await getMasterAllAuthors();
   const school = await getSchool();
   const campus = await getCampus();
   const editor = await getEditors();
   return {
      nmimsAuthors,
      allAuthors,
      school,
      campus,
      editor,
   };
};

export const insertBookChapterService = async (
   bookChapterData: bookChapterDetails,
   documents: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[] | undefined,
) => {
   const logger = getLogger();
   console.log('bookChapterData in service ====>>>>>', bookChapterData);
   let uploadDocuments = await uploadFile(documents);
   bookChapterData.supporting_documents = uploadDocuments.map((data) => data);

   console.log('bookChapterData ===>>>>>>', bookChapterData);

   const data = await insertBookChapterModel(bookChapterData);

   return data;
};

export const bookChapterPublicationEditViewService = async (booChapterId: number) => {
   console.log('booChapterId in services ===>>>>>', booChapterId);
   const bookChapterPublicationData = await booChapterEditViewModel(booChapterId);
   const nmimsAuthors = await getMasterNmimsAuthors();
   const allAuthors = await getMasterAllAuthors();
   const school = await getSchool();
   const campus = await getCampus();
   const editor = await getEditors();

   return {
      bookChapterPublicationData,
      nmimsAuthors,
      allAuthors,
      school,
      campus,
      editor,
   };
};

export const updateBookChapterService = async (
   bookChapterData: bookChapterDetails,
   documents: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[] | undefined,
   booChapterId: number,
) => {
   const logger = getLogger();
   console.log('bookChapterData in service ====>>>>>', bookChapterData);
   let uploadDocuments = await uploadFile(documents);

   if (uploadDocuments.length > 0) {
      bookChapterData.supporting_documents = uploadDocuments.map((data) => data);
   } else {
      bookChapterData.supporting_documents = [];
   }

   bookChapterData.book_chapter_id = booChapterId;
   console.log('upload documents ', uploadDocuments);

   const data = await updateBookChapterModel(bookChapterData);

   return data;
};

export const deleteBookChapterService = async (bookChapterId: number) => {
   const logger = getLogger();
   console.log('bookChapterId in service ====>>>>>', bookChapterId);

   const data = await deleteBookChapterModel(bookChapterId);

   return data;
};

export const bookChapterViewService = async (booChapterId: number) => {
   console.log('booChapterId in services ===>>>>>', booChapterId);
   const bookChapterFiles = await bookChapterPublicationFiles(booChapterId);
   const filesUrls = await getUploadedFile(bookChapterFiles);

   const data = await bookChapterPublicationFormviewModel(booChapterId);
   return {files : filesUrls ,bookChapterPublicationData : data};
}

export const bookChapterPublicationDownloadFileService = async (bookChapterId: number, req: Request, res: Response) => {
   // const logger = getLogger();

   const data = await bookChapterPublicationFiles(bookChapterId);

   let files: string[] = data.map((dt) => dt.document_name);
   await downloadFile(files, req, res);
};
