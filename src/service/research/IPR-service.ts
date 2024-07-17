import { getLogger } from '$config/logger-context';

import { insertIPRModel, updateIPRModel, deleteIPRModel, iprPaginateModel,
   iprEditViewModel, viewIprModel, downloadIprFilesModel
 } from '$model/ipr-model';

import { IPRDetails }  from 'types/research.types';




import { paginationDefaultType } from 'types/db.default';

import { getSchool,getCampus,getEnternalFaculty, 
	getExternalFaculty, getSdgGoals, getInventionType, getPatentStatus, getApplicantNames

} from '$model/master-model';

import {uploadFile} from '$middleware/fileupload.middleware'

import { Request,Response } from 'express';

import { downloadFile } from '$middleware/fileupload.middleware';

import { string } from 'zod';





export const iprPaginateService = async ({

    page,

    limit,

    sort,

    order,

    search,

    ...filters

 }: paginationDefaultType) => {

    const logger = getLogger();

    logger.info('INSIDE GET SUBJECT RESEARCH SERVICES ');

 

    const data = await iprPaginateModel({

       page,

       limit,

       sort,

       order,

       search,

       ...filters,

    });

 

    return data;

 }; 



 export const iprRenderService = async () => {

    const logger = getLogger();

    const externalAuthors = await getExternalFaculty();

    const internalAuthors = await getEnternalFaculty();

    const school = await getSchool();

    const campus = await getCampus();

    const status = await getPatentStatus();

    const inventionType = await getInventionType();

    const sdgGoals = await getSdgGoals();
    const applicantNames = await getApplicantNames();

    

    return {

       school,campus, externalAuthors, internalAuthors, status, inventionType, sdgGoals, applicantNames

    };

  }



export const insertIPRService = async (iprData: IPRDetails, documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined) => {
    const logger = getLogger();

    let uploadDocuments = await uploadFile(documents);
    iprData.supporting_documents = uploadDocuments;
    iprData.faculty_id = [...iprData.internal_authors, ...iprData.external_authors];
    delete iprData.internal_authors;
    delete iprData.external_authors;

    console.log('iprData data in service ===>>>>>>', iprData);


    const data = await insertIPRModel(iprData);

 

    return data;

}


export const iprEditViewService = async(iprId : number) => {
   const logger = getLogger();

   const iprDataList = await iprEditViewModel(iprId);
   const externalAuthors = await getExternalFaculty();

   const internalAuthors = await getEnternalFaculty();

   const school = await getSchool();

   const campus = await getCampus();

   const status = await getPatentStatus();

   const inventionType = await getInventionType();

   const sdgGoals = await getSdgGoals();
   const applicantNames = await getApplicantNames();

   

   return {

      iprDataList, school,campus, externalAuthors, internalAuthors, status, inventionType, sdgGoals, applicantNames

   };
}


export const updateIPRService = async (iprId:number, iprData: IPRDetails, documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined)  => {

    const logger = getLogger();

    let uploadDocuments = await uploadFile(documents);
    iprData.supporting_documents = uploadDocuments;
    iprData.faculty_id = [...iprData.internal_authors, ...iprData.external_authors];
    delete iprData.internal_authors;
    delete iprData.external_authors;
    iprData.ipr_id = iprId;

    console.log('details for update ipr data ===>>>>', iprData);

    const data = await updateIPRModel(iprData);




    return data;

}

export const viewIprService = async (iprId: number) => {

   const logger = getLogger();

   const data = await viewIprModel(iprId);

   return data;

}

export const deleteIPRService = async (iprId: number) => {

    const logger = getLogger();
    const data = await deleteIPRModel(iprId);

    return data;

} 

export const iprDownloadFilesService = async (iprId : number,req:Request,res:Response) => {

   const data = await downloadIprFilesModel(iprId);

   let files : string[] = data.map(dt => dt.document_name); 
   await downloadFile(files, req,res);
 }