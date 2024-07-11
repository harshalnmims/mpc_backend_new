import { getLogger } from '$config/logger-context';
import { downloadFile, uploadFile } from '$middleware/fileupload.middleware';
import {getCaseStudyModel, insertCaseStudyModel, updateCaseStudyModel ,
    deleteCaseStudyModel,CaseStudyPaginateModel,CaseStudyViewModel,
    CaseStudyUpdateViewModel,caseStudyFiles
 } from '$model/case-study-model';
 import {
   getSchool,getCampus,getMasterAllAuthors,getMasterNmimsAuthors
} from '$model/master-model';
import exp from 'constants';
import { paginationDefaultType } from 'types/db.default';
import {Request,Response} from 'express'
import { caseStudyDetails} from 'types/research.types';
import { number } from 'zod'; 

export const getCaseStudyService = async ({
    page,
    limit,
    sort,
    order,
    search,
    ...filters
 }: paginationDefaultType) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT CASE STUDY SERVICES');
 
    const data = await getCaseStudyModel({
       page,
       limit,
       sort,
       order,
       search,
       ...filters,
    });
 
    return data;
 };

 export const CaseStudyPaginateService = async ({
    page,
    limit,
    sort,
    order,
    search,
    ...filters
 }: paginationDefaultType) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT CASE STUDY SERVICES');
 
    const data = await CaseStudyPaginateModel({
       page,
       limit,
       sort,
       order,
       search,
       ...filters,
    });
 
    return data;
 };

export const insertCaseStudyService = async (caseStudyData : caseStudyDetails,documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined) => {
     
     let uploadDocuments = await uploadFile(documents);
     caseStudyData.supporting_documents  = uploadDocuments.map(data =>  data);

    const data = await insertCaseStudyModel(caseStudyData);
    return data;
 };

export const updateCaseStudyService = async (updateCaseStudyData : caseStudyDetails,documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined,caseStudyId:number) => {
   
     let uploadDocuments = await uploadFile(documents);

     if(uploadDocuments.length > 0) {
     updateCaseStudyData.supporting_documents  = uploadDocuments.map(data =>  data);
     }else{
     updateCaseStudyData.supporting_documents = []; 
     }

     updateCaseStudyData.case_study_id = caseStudyId;
     const data = await updateCaseStudyModel(updateCaseStudyData);
   
    return data;
 };

 export const deleteCaseStudyService = async (caseStudyId : number) => {
  
    console.log('updateCaseStudyData in service ====>>>>>', caseStudyId);
 
    const data = await deleteCaseStudyModel(caseStudyId);
 
    return data;
 };

 export const CaseStudyRenderService = async () => {
   
    const nmims_campus = await getCampus();
    const nmims_school = await getSchool();
    const all_authors = await getMasterAllAuthors();
    const nmims_authors = await getMasterNmimsAuthors();
    return {nmims_campus,nmims_school,all_authors,nmims_authors};
 };

 export const CaseStudyViewService = async (caseStudyId : number) => {
   
    const data = await CaseStudyViewModel(caseStudyId);
    return data;
 };

 export const CaseStudyUpdateViewService = async (caseStudyId:number) => {
   
    const caseData = await CaseStudyUpdateViewModel(caseStudyId); 
    const nmims_campus = await getCampus();
    const nmims_school = await getSchool();
    const all_authors = await getMasterAllAuthors();
    const nmims_authors = await getMasterNmimsAuthors();
    return {caseData,nmims_campus,nmims_school,all_authors,nmims_authors};
 };

 export const caseStudyDownloadFileService = async (caseStudyId : number,req:Request,res:Response) => {
   // const logger = getLogger();

   const data = await caseStudyFiles(caseStudyId);

  let files : string[] = data.map(dt => dt.document_name); 
   await downloadFile(files,req,res);
 }
