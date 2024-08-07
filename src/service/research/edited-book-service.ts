import { getLogger } from '$config/logger-context';
import { getEditedBookPublicationModels, insertEditedBookPublicationModel, 
   updateEditedBookModel, deleteEditedBookModel, editedBookPaginateModel, editedBookPublicationEditView,
editedBookPublicationFile, editedBookPublicationFormviewModel } from '$model/edited-book-model';
import { paginationDefaultType } from 'types/db.default';
import{ getSchool, getCampus, getAllAuthors, getNmimsAuthors, getEditors, getMasterNmimsAuthors, getMasterAllAuthors } from '$model/master-model';
import { downloadFile, getUploadedFile } from '$middleware/fileupload.middleware';

import { EditedBookPublicationDetails } from 'types/research.types';
import { uploadFile } from '$middleware/fileupload.middleware';
import { Request, Response, NextFunction } from 'express';

export const getEditedBookPublicationService = async ({
   page,
   limit,
   sort,
   order,
   search,
   ...filters
}: paginationDefaultType) => {

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


export const insertEditedBookPublicationService = async (editedBookPublicationData: EditedBookPublicationDetails, documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined, username: string) => {
   const logger = getLogger();
   let uploadDocuments = await uploadFile(documents);
   editedBookPublicationData.supporting_documents  = uploadDocuments.map(data =>  data);

   console.log('editedBookPublicationData ===>>>>>>', editedBookPublicationData)
 
    const data = await insertEditedBookPublicationModel(editedBookPublicationData,username);
 
    return data;
 }; 

 export const updateEditedBookService = async (updateEditedBookPublicationData : EditedBookPublicationDetails, documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined, username:string, editedBookId: number) => {
   const logger = getLogger();
   let uploadDocuments = await uploadFile(documents);

    if (uploadDocuments.length > 0) {
      updateEditedBookPublicationData.supporting_documents = uploadDocuments.map(data => data);
    } else {
      updateEditedBookPublicationData.supporting_documents = [];
    }
    
    updateEditedBookPublicationData.edited_publication_id = editedBookId;
    console.log('upload documents ', uploadDocuments);

   const data = await updateEditedBookModel(updateEditedBookPublicationData,username);
 
   return data;

 } 

 export const deleteEditedBookService = async(editedbookId : number,username:string) => {

   console.log('editedbookId in service ===>>>', editedbookId);

   const data = await deleteEditedBookModel(editedbookId,username);

   console.log('data ===>>>>>', data);
   return data

}

export const editedBookPaginateService = async ({
   page,
   limit,
   sort,
   order,
   search,
   ...filters
}: paginationDefaultType,username:string) => {

   const data = await editedBookPaginateModel({
      page,
      limit,
      sort,
      order,
      search,
      ...filters,
   },username);

   return data;
}

export const editedBookRenderService = async (username : string) => {  
   
   const schoolData = await getSchool(username);
   const campusData = await getCampus(username);
   const authorData = await getMasterAllAuthors(username);
   const nmimsAuthorData = await getMasterNmimsAuthors(username);
   const editorsData = await getEditors(username);

   return { schoolData, campusData, authorData, nmimsAuthorData, editorsData };
}

export const editedBookPublicationEditViewService = async (editedBookId : number, username: string) => {
   console.log('editedbook Id in services ===>>>>>', editedBookId);
   const editedBookPublicationEditViewData = await editedBookPublicationEditView(editedBookId);
   const nmimsAuthors = await getMasterNmimsAuthors(username);
   const allAuthors = await getMasterAllAuthors(username);
   const school = await getSchool(username);
   const campus = await getCampus(username);
   const editor = await getEditors(username);

   return {
      editedBookPublicationEditViewData, nmimsAuthors,allAuthors,school,campus,editor
   };
}

export const editedBookPublicationDownloadFileService = async (editedBookId : number,req:Request,res:Response) => {
   const data = await editedBookPublicationFile(editedBookId)

   let files : string[] = data.map(dt => dt.document_name); 
   await downloadFile(files, req, res);
}

export const editedBookViewService = async (editedBookId: number) => {
   console.log('book id in view edited book', editedBookId);

   const bookChapterFiles = await editedBookPublicationFile(editedBookId);
   const filesUrls = await getUploadedFile(bookChapterFiles);

   const data = await editedBookPublicationFormviewModel(editedBookId);

   return {files : filesUrls ,editedBookPublicationData : data};
   
}