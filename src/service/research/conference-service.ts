import { getLogger } from '$config/logger-context';
import {
   getConferenceModel,
   insertConferenceModel,
   updateConferencemodels,
   deleteConferenceModel,
   getConferenceDocumentsAbbr,
   conferenceEditViewModel,
   conferenceViewModel,
   conferenceFilesModel,
   getConferenceFilesModel
} from '$model/conference-model';
import { paginationDefaultType } from 'types/db.default';
import { uploadMultiFile } from '$middleware/fileupload.middleware';
import {
   renderModal,
   getNmimsAuthors,
   getMasterAllAuthors,
   getSchool,
   getCampus,
   getEnternalFaculty,
   getExternalFaculty
} from '$model/master-model';
import exp from 'constants';
import { downloadFile } from '$middleware/fileupload.middleware';
import { Request, Response } from 'express';

import { conferenceDetails } from 'types/research.types';
import { any, number, string } from 'zod';

import { getMultiUploadedFile, uploadFile } from '$middleware/fileupload.middleware';


export const getConferenceService = async ({ page, limit, sort, order, search, ...filters }: paginationDefaultType) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT RESEARCH SERVICES');

   const data = await getConferenceModel({
      page,
      limit,
      sort,
      order,
      search,
      ...filters,
   });

   return data;
};

export const renderConferenceListsService = async () => {
   const nmimsAuthors = await getNmimsAuthors();
   const masterAllAuthors = await getMasterAllAuthors();
   const school = await getSchool();
   const campus = await getCampus();
   const externalAuthors = await getExternalFaculty();
   const enternalAuthors = await getEnternalFaculty();
   const conferenceDocumentAbbr = await getConferenceDocumentsAbbr();
   return {
      conferenceDocumentAbbr,
      nmimsAuthors,
      masterAllAuthors,
      school,
      campus,
      externalAuthors,
      enternalAuthors,
   };
};

export const insertConferenceService = async (
   conferenceData: conferenceDetails,
   documents: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[] | undefined,
) => {
   const logger = getLogger();
   console.log('documents in service ===>>>>>>', documents);
   let uploadDocuments = await uploadMultiFile(documents);
   console.log('uploadDocuments ===>>>>>', uploadDocuments);

   // Add uploaded documents to conferenceData with the required fields
   conferenceData.conference_documents = uploadDocuments;

   conferenceData.faculty_id = [...conferenceData.internal_authors, ...conferenceData.external_authors];
   delete conferenceData.internal_authors;
   delete conferenceData.external_authors;

   console.log('Updated conferenceData ===>>>>>', conferenceData);
   const data = await insertConferenceModel(conferenceData);

   return data;
};

export const conferenceEditViewService = async (conferenceId: number) => {
   const logger = getLogger();

   console.log('conferenceId in service ====>>>>>', conferenceId);

   const conferenceDetails = await conferenceEditViewModel(conferenceId);
   const masterAllAuthors = await getMasterAllAuthors();
   const school = await getSchool();
   const campus = await getCampus();
   const externalAuthors = await getExternalFaculty();
   const enternalAuthors = await getEnternalFaculty();
   const conferenceDocumentAbbr = await getConferenceDocumentsAbbr();

   return {
      conferenceDetails,
      masterAllAuthors,
      school,
      campus,
      externalAuthors,
      enternalAuthors,
      conferenceDocumentAbbr,
   };
};

export const updateConferenceService = async (
   conferenceId: number,
   updateConferenceData: conferenceDetails,
   documents: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[] | undefined,
) => {
   const logger = getLogger();

   console.log('updateConferenceData in service ====>>>>>', updateConferenceData);
   console.log('documents in service ===>>>>>>', documents);
   let uploadDocuments = await uploadMultiFile(documents);
   console.log('uploadDocuments ===>>>>>', uploadDocuments);
   updateConferenceData.conference_documents = uploadDocuments;

   updateConferenceData.faculty_id = [
      ...updateConferenceData.internal_authors,
      ...updateConferenceData.external_authors,
   ];
   delete updateConferenceData.internal_authors;
   delete updateConferenceData.external_authors;
   updateConferenceData.conference_id = conferenceId;

   console.log('updateConferenceData ===>>>>>>>', updateConferenceData);

   const data = await updateConferencemodels(updateConferenceData);

   return data;
};

export const viewConferenceService = async (conferenceId: number) => {
   const logger = getLogger();

   const data = await conferenceViewModel(conferenceId);
   const conferenceFile = await getConferenceFilesModel(conferenceId);
   const filesUrls = await getMultiUploadedFile(conferenceFile);

   return {conferenceDetails : data, type_abbr:string, files:filesUrls}
};

export const deleteConferenceService = async (conferenceId: number) => {
   const logger = getLogger();
   console.log('conferenceId in service ====>>>>>', conferenceId);

   const data = await deleteConferenceModel(conferenceId);

   return data;
};

export const downloadConferenceFilesServicve = async (
   conferenceId: number,
   abbr: string,
   req: Request,
   res: Response,
) => {
   const logger = getLogger();
   console.log('conferenceId in model  ===>>>', conferenceId);
   console.log('abbr in model ===>>>', abbr);

   const data = await conferenceFilesModel(conferenceId, abbr);

   let files: string[] = data.map((dt) => dt.document_name);
   await downloadFile(files, req, res);
};
