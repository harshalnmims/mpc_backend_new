import { getLogger } from '$config/logger-context';
import { ResearchProjectPaginateModel, insertResearchProjectModel, updateResearchProjectModel, 
    deleteResearchProjectModel, researchProjectEditViewModel, viewResearchProjectModel, downloadResearchProjectFilesModel
 } from '$model/research-project-model';

import exp from 'constants';
import { paginationDefaultType } from 'types/db.default';
import { researchProjectDetails} from 'types/research.types';
import { number } from 'zod';

import { getSchool,getCampus,getEnternalFaculty, 
	getExternalFaculty, getResearchProjectStatus

} from '$model/master-model'; 

import {uploadFile} from '$middleware/fileupload.middleware'

import { Request,Response } from 'express';

import { downloadFile } from '$middleware/fileupload.middleware';

import { string } from 'zod';



export const getResearchProjectService = async ({
   page,
   limit,
   sort,
   order,
   search,
   ...filters

}: paginationDefaultType) => {

const logger = getLogger();

logger.info('INSIDE GET SUBJECT RESEARCH SERVICES ');



const data = await ResearchProjectPaginateModel({
   page,
   limit,
   sort,
   order,
   search,

   ...filters,

});



return data;

}; 


export const researchProjectRenderService = async () => {

   const logger = getLogger();

   const externalAuthors = await getExternalFaculty();

   const internalAuthors = await getEnternalFaculty();

   const school = await getSchool();

   const campus = await getCampus();

   const status = await getResearchProjectStatus();



   

   return {

      school,campus, externalAuthors, internalAuthors, status

   };

 }




export const insertResearchProjectService = async (researchData : researchProjectDetails, documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined) => {
    const logger = getLogger();
   
    let uploadDocuments = await uploadFile(documents);
    researchData.supporting_documents = uploadDocuments;
    researchData.faculty_id = [...researchData.internal_authors, ...researchData.external_authors];
    delete researchData.internal_authors;
    delete researchData.external_authors;

    console.log('researchData data in service ===>>>>>>', researchData);
 
    const data = await insertResearchProjectModel(researchData);
 
    return data;
 }; 


export const researchProjectEditViewService = async(researchProjectId : number) => {
   const logger = getLogger();

   const ResearchProjectDataList = await researchProjectEditViewModel(researchProjectId);
   const externalAuthors = await getExternalFaculty();

   const internalAuthors = await getEnternalFaculty();

   const school = await getSchool();

   const campus = await getCampus();

   const status = await getResearchProjectStatus();

   

   return {

      ResearchProjectDataList, school,campus, externalAuthors, internalAuthors, status

   };
}

export const updateResearchProjectService = async (researchProjectId : number, updateResearchData : researchProjectDetails, documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined) => {
    const logger = getLogger();

    let uploadDocuments = await uploadFile(documents);
    updateResearchData.supporting_documents = uploadDocuments;
    updateResearchData.faculty_id = [...updateResearchData.internal_authors, ...updateResearchData.external_authors];
    delete updateResearchData.internal_authors;
    delete updateResearchData.external_authors;
    updateResearchData.research_project_id = researchProjectId;

    console.log('updateResearchData ===>>>>>>', updateResearchData);
 
    const data = await updateResearchProjectModel(updateResearchData);
 
    return data;
 };



export const viewResearchProjectService = async (researchProjectId: number) => {

   const logger = getLogger();

   const data = await viewResearchProjectModel(researchProjectId);

   return data;

}



export const deleteResearchProjectService = async(researchprojectId : number) => {
    const logger = getLogger();
    logger.info('INSIDE GET  PATENT SUBMISSION');
    console.log('researchprojectId in service ====>>>>>', researchprojectId);
 
    const data = await deleteResearchProjectModel(researchprojectId);
 
    return data;

};


export const researchProjectDownloadFilesService = async (researchprojectId : number,req:Request,res:Response) => {

   const data = await downloadResearchProjectFilesModel(researchprojectId);

   let files : string[] = data.map(dt => dt.document_name); 
   await downloadFile(files, req,res);
 }