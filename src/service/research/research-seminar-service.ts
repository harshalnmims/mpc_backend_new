import { getLogger } from '$config/logger-context';
import { downloadFile, getUploadedFile, uploadFile } from '$middleware/fileupload.middleware';
import { getAbdcIndexed, getCampus, getMasterNmimsAuthors, getNmimsAuthors, getSchool } from '$model/master-model';
import { getResearchSeminarModel, insertResearchSeminarModel, updateResearchSeminarModel,
     deleteResearchSeminarModel,ResearchSeminarPaginateModel,researchSeminarViewModel,researchSeminarUpdViewModel,
     seminarFiles
 } from '$model/research-seminar-model';
import exp from 'constants';
import { paginationDefaultType } from 'types/db.default';
import {Request,Response} from 'express'
import { seminarDetails} from 'types/research.types';
import { number } from 'zod'; 

export const getResearchSeminarService = async ({
    page,
    limit,
    sort,
    order,
    search,
    ...filters
 }: paginationDefaultType) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT RESEARCH SERVICES');
 
    const data = await getResearchSeminarModel({
       page,
       limit,
       sort,
       order,
       search,
       ...filters,
    });
 
    return data;
 };

 export const ResearchSeminarPaginateService = async ({
    page,
    limit,
    sort,
    order,
    search,
    ...filters
 }: paginationDefaultType,username:string) => {
   
 
    const data = await ResearchSeminarPaginateModel({
       page,
       limit,
       sort,
       order,
       search,
       ...filters,
    },username);
 
    return data;
 };

export const insertResearchSeminarService = async (researchSeminarData : seminarDetails, documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined,username:string) => {
         
       let uploadDocuments = await uploadFile(documents);
       researchSeminarData.supporting_documents  = uploadDocuments.map(data =>  data);
       const data = await insertResearchSeminarModel(researchSeminarData,username);
       console.log('final research json ',JSON.stringify(data))
       return data;
 
 };


 export const updateResearchSeminarService = async (researchSeminarData : seminarDetails, documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined,seminarId : number,username:string) => {
   
    let uploadDocuments = await uploadFile(documents);
    if(uploadDocuments.length > 0){
     researchSeminarData.supporting_documents  = uploadDocuments.map(data =>  data);
    }else{
      researchSeminarData.supporting_documents  = [];
    }
    researchSeminarData.research_seminar_id = seminarId;
    const data = await updateResearchSeminarModel(researchSeminarData,username);
 
    return data;
 };

 export const deleteResearchSeminalService = async(seminarId: number,username:string) => {

    const data = await deleteResearchSeminarModel(seminarId,username);
    return data;
 }

 export const researchSeminarRenderService = async(username : string) => {
     const nmims_school = await getSchool(username);
     const nmims_campus = await getCampus(username);
     const abdcIndexed = await getAbdcIndexed();
     const nmims_authors = await getMasterNmimsAuthors(username);

     return {nmims_school,nmims_campus,abdcIndexed,nmims_authors};
 }

 
 export const researchSeminarViewService = async(researchId : number) => {
   const researchSeminarFiles = await seminarFiles(researchId);
   const filesUrls = await getUploadedFile(researchSeminarFiles);
   const data = await researchSeminarViewModel(researchId);
   return {files:filesUrls,researchSeminarData:data};
}

export const researchSeminarUpdateViewService = async(seminarId : number, username : string) => {
   const researchSeminarData = await researchSeminarUpdViewModel(seminarId);
   const nmims_school = await getSchool(username);
   const nmims_campus = await getCampus(username);
   const abdcIndexed = await getAbdcIndexed();
   const nmims_authors = await getMasterNmimsAuthors(username);

   return {researchSeminarData,nmims_school,nmims_campus,abdcIndexed,nmims_authors};
}

export const researchSeminarDownloadFileService =  async (seminarId : number,req:Request,res:Response) => {

   const data = await seminarFiles(seminarId);

  let files : string[] = data.map(dt => dt.document_name); 
   await downloadFile(files, req,res);
 }