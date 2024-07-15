import { getLogger } from '$config/logger-context';
import { downloadFile, uploadFile } from '$middleware/fileupload.middleware';
import { getCampus, getSchool } from '$model/master-model';
import { getResearchAwardModel, insertResearchAwardModel, updateResearchAwardModel, 
    deleteResearchAwardModel,researchAwardPaginateModel,researchAwardViewModel,researchAwardUpdateViewModel,awardFiles
 } from '$model/research-award-model';
import exp from 'constants';
import { paginationDefaultType } from 'types/db.default';
import {Request,Response} from 'express'
import { researchAwardDetails} from 'types/research.types';
import { number } from 'zod'; 

export const getResearchAwardService = async ({
    page,
    limit,
    sort,
    order,
    search,
    ...filters
 }: paginationDefaultType) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT RESEARCH SERVICES');
 
    const data = await getResearchAwardModel({
       page,
       limit,
       sort,
       order,
       search,
       ...filters,
    });
 
    return data;
 };

 export const researchAwardPaginateService = async ({
   page,
   limit,
   sort,
   order,
   search,
   ...filters
}: paginationDefaultType) => {
   
   const data = await researchAwardPaginateModel({
      page,
      limit,
      sort,
      order,
      search,
      ...filters,
   });

   return data;
};


export const insertResearchAwardService = async (researchAwardData : researchAwardDetails, documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined) => {
    
   let uploadDocuments = await uploadFile(documents);
   researchAwardData.supporting_documents  = uploadDocuments.map(data =>  data);
   const data = await insertResearchAwardModel(researchAwardData);
 
    return data;
 };

export const updateResearchAwardService = async (updateResearchAwardData : researchAwardDetails,documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined,researchAwardId:number) => {
    
    let uploadDocuments = await uploadFile(documents);
    if(uploadDocuments.length > 0){
    updateResearchAwardData.supporting_documents  = uploadDocuments.map(data =>  data);
   }else{
     updateResearchAwardData.supporting_documents  = uploadDocuments.map(data =>  data);
   } 
   updateResearchAwardData.research_award_id = researchAwardId;
   const data = await updateResearchAwardModel(updateResearchAwardData);

    return data;
 };

export const deleteResearchAwardService = async(awardId : number) => {
    const logger = getLogger();
    logger.info('INSIDE GET RESEARCH AWARD  SERVICES');
    console.log('awardId ===>>>>', awardId);

    const data = await deleteResearchAwardModel(awardId);
    
    return data;
}

export const researchAwardRenderService = async () => {
   const nmims_school = await getSchool();
   const nmims_campus = await getCampus();
   return {nmims_school,nmims_campus}
}

export const researchAwardViewService = async (awardId : number) => {
    
   const data = await researchAwardViewModel(awardId)
   return data;
}

export const researchAwardUpdViewService = async (awardId : number) => {
    
   const researchAwardData = await researchAwardUpdateViewModel(awardId)
   const nmims_school = await getSchool();
   const nmims_campus = await getCampus();
   return {researchAwardData,nmims_school,nmims_campus};
}

export const researchAwardDownloadFileService = async (awardId : number,req:Request,res:Response) => {
    
  const data = await awardFiles(awardId);
  let files : string[] = data.map((dt => dt.document_name)); 
  await downloadFile(files, req,res);
}
