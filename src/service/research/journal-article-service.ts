import { getLogger } from '$config/logger-context';
import { getJournalArticlePublished, insertJournalArticleModel, updateJournalArticleModel,
    deleteJournalArticleModel,journalPaginateModal,journalViewData,journalFiles,journalUpdateViewData,
    checkFormStatusModel,journalFormInfiniteModel,journalApprovalInsertModel
 } from '$model/journal-article-model';
import { paginationDefaultType } from 'types/db.default';
import { ApprovalDetails, journalArticleDetails } from 'types/research.types';
import {renderModal,getPolicyCadre,getNmimsAuthors,getAllAuthors,getAbdcIndexed, getPaperType,
   getSchool,getCampus
} from '$model/master-model';
import {getUploadedFile, uploadFile} from '$middleware/fileupload.middleware'
import { Request,Response } from 'express';
import { downloadFile } from '$middleware/fileupload.middleware';
import { string } from 'zod';
import { getRedisData } from '$utils/db/redis';


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
}: paginationDefaultType,username : string) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT RESEARCH SERVICES ');

   const data = await journalPaginateModal({
      page,
      limit,
      sort,
      order,
      search,
      ...filters,
   }, username);

   return data;
};

export const insertJournalArticleService = async (journalDetails: journalArticleDetails, documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined,username : string) => {
            
       let uploadDocuments = await uploadFile(documents);
       journalDetails.supporting_documents  = uploadDocuments.map(data =>  data);

       const data  = await insertJournalArticleModel(journalDetails,username);
       console.log('final journal json ',JSON.stringify(data))
       return data;
 }; 


 export const updateJournalArticleService = async (updateJournalDetails: journalArticleDetails,documents : { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined,journalId :number,username:string) => {

 
    let uploadDocuments = await uploadFile(documents);
    
    if(uploadDocuments.length > 0){
    updateJournalDetails.supporting_documents  = uploadDocuments.map(data =>  data);
    }else{
    updateJournalDetails.supporting_documents = [];  
    }

    updateJournalDetails.journal_paper_id = journalId;
    console.log('upload documents ',uploadDocuments)

    const data = await updateJournalArticleModel(updateJournalDetails,username);
    const viewData = await journalUpdateViewData(journalId);

    return  {data,viewData};
 };


 export const deleteJournalArticleService = async(journalPaperId : number,username:string) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');

    console.log('journalPaperId in service ===>>>', journalPaperId);
 
    const data = await deleteJournalArticleModel(journalPaperId,username);

    console.log('data ===>>>>>', data);
    return data

 }

 export const journalRenderService = async (username : string) => {
   
   const foreignAuthors =  await renderModal('fa');
   const StudentAuthors =  await renderModal('sa');
   const otherAuthors = await renderModal('oa');
   const policyCadre = await getPolicyCadre();
   const nmimsAuthors = await getNmimsAuthors(); 
   const allAuthors = await getAllAuthors();  
   const abdcIndexed = await getAbdcIndexed();
   const paperType = await getPaperType();
   const school = await getSchool(username);
   const campus = await getCampus(username);
   return {
      foreignAuthors,StudentAuthors,otherAuthors,policyCadre,nmimsAuthors,allAuthors,abdcIndexed,paperType,school,campus
   };
 }

 export const journalViewService = async (journalPaperId : number) => {
   const journalDocuments = await journalFiles(journalPaperId);
   const filesUrls = await getUploadedFile(journalDocuments);

   console.log('signed url ',filesUrls);

   const data = await journalViewData(journalPaperId);
   return {files : filesUrls ,journalData : data};
 }

 export const journalDownloadFileService = async (journalPaperId : number,req:Request,res:Response) => {

   const data = await journalFiles(journalPaperId);
   let files : string[] = data.map(dt => dt.document_name); 
   await downloadFile(files, req,res);
 }

 export const journalUpdateViewService = async (journalId :number, username:string) => {

   const journalData = await journalUpdateViewData(journalId);
   const foreignAuthors =  await renderModal('fa');
   const StudentAuthors =  await renderModal('sa');
   const otherAuthors = await renderModal('oa');
   const policyCadre = await getPolicyCadre();
   const nmimsAuthors = await getNmimsAuthors();
   const allAuthors = await getAllAuthors();
   const abdcIndexed = await getAbdcIndexed();
   const paperType = await getPaperType();
   const school = await getSchool(username);
   const campus = await getCampus(username);
   return {
    foreignAuthors,StudentAuthors,otherAuthors,policyCadre,nmimsAuthors,allAuthors,abdcIndexed,paperType,school,campus,journalData
   };
 }

 export const checkFormStatusService = async (journalId :number) => { 
  
   const data = await checkFormStatusModel(journalId);
   return data;

 }

export const journalFormInfiniteService = async ({
    page,
    limit,
    sort,
    order,
    search,
    ...filters
 }: paginationDefaultType,username:string, tableId: number) => {
   
    const data = await journalFormInfiniteModel({
       page,
       limit,
       sort,
       order,
       search,
       ...filters,
    },username, tableId);
 
    return data;
 };

 export const journalApprovalInsertService = async (approvalDetails : ApprovalDetails ,username : string) => {
   const data = await journalApprovalInsertModel(approvalDetails,username);
   return data;
 }