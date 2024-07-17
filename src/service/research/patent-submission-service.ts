import { getLogger } from '$config/logger-context';
import { getPatentSubmissionModel, insertPatentSubmissionModel, updatePatentSubmissionModel, 
    deletePatentSubmissionModel, patentEditViewModel, viewPatentModel, downloadPatentFilesModel
 } from '$model/patent-submission-model';
import exp from 'constants';
import { paginationDefaultType } from 'types/db.default';

import {getEnternalFaculty, 
	getExternalFaculty, getSdgGoals, getInventionType, getPatentStatus

} from '$model/master-model';

import { patentDetails} from 'types/research.types';
import { number } from 'zod';

import {uploadFile} from '$middleware/fileupload.middleware'

import { Request,Response } from 'express';

import { downloadFile } from '$middleware/fileupload.middleware';

import { string } from 'zod';

export const getBookPatentService = async ({
      page,
      limit,
      sort,
      order,
      search,
      ...filters

}: paginationDefaultType) => {

   const logger = getLogger();

   logger.info('INSIDE GET SUBJECT RESEARCH SERVICES ');



   const data = await getPatentSubmissionModel({
      page,
      limit,
      sort,
      order,
      search,

      ...filters,

   });



   return data;

}; 


export const PatentRenderService = async () => {

   const logger = getLogger();

   const externalAuthors = await getExternalFaculty();

   const internalAuthors = await getEnternalFaculty();

   const status = await getPatentStatus();

   const inventionType = await getInventionType();

   const sdgGoals = await getSdgGoals();

   

   return {

       externalAuthors, internalAuthors, status, inventionType, sdgGoals

   };

 }

 export const insertPatentSubmissionService = async (patentData : patentDetails, documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined) => {
    const logger = getLogger();
    let uploadDocuments = await uploadFile(documents);
    patentData.supporting_documents = uploadDocuments;
    patentData.faculty_id = [...patentData.internal_authors, ...patentData.external_authors];
    delete patentData.internal_authors;
    delete patentData.external_authors;

    console.log('patentData data in service ===>>>>>>', patentData);
 
    const data = await insertPatentSubmissionModel(patentData);
 
    return data;
 } 


 export const patentEditViewService = async(patentId : number) => {
   const logger = getLogger();

   const patentDataList = await patentEditViewModel(patentId);
   const externalAuthors = await getExternalFaculty();

   const internalAuthors = await getEnternalFaculty();


   const status = await getPatentStatus();

   const inventionType = await getInventionType();

   const sdgGoals = await getSdgGoals();

   

   return {

      patentDataList, externalAuthors, internalAuthors, status, inventionType, sdgGoals

   };
}

export const updatePatentSubmissionService = async (patentId : number,updatePatentData : patentDetails, documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined)=> {
    const logger = getLogger();
    let uploadDocuments = await uploadFile(documents);
    updatePatentData.supporting_documents = uploadDocuments;
    updatePatentData.faculty_id = [...updatePatentData.internal_authors, ...updatePatentData.external_authors];
    delete updatePatentData.internal_authors;
    delete updatePatentData.external_authors;
    updatePatentData.patent_id = patentId;

    console.log('details for update data ===>>>>', updatePatentData);
 
    const data = await updatePatentSubmissionModel(updatePatentData);
 
    return data;
}



export const viewPatentService = async (patentId: number) => {

   const logger = getLogger();

   const data = await viewPatentModel(patentId);

   return data;

}


export const deletePatentSubmissionService = async(patentId : number) => {
    const logger = getLogger();
    console.log('patentId in service ====>>>>>', patentId);
 
    const data = await deletePatentSubmissionModel(patentId);
 
    return data;

};



export const patentDownloadFilesService = async (patentId : number,req:Request,res:Response) => {

   const data = await downloadPatentFilesModel(patentId);

   let files : string[] = data.map(dt => dt.document_name); 
   await downloadFile(files, req,res);
 }


