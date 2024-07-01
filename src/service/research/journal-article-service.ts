import { getLogger } from '$config/logger-context';
import { getJournalArticlePublished, insertJournalArticleModel, updateJournalArticleModel,
    deleteJournalArticleModel,journalPaginateModal
 } from '$model/journal-article-model';
import { paginationDefaultType } from 'types/db.default';
import { journalArticleDetails } from 'types/research.types';
import {renderModal,getPolicyCadre,getNmimsAuthors,getAllAuthors,getAbdcIndexed, getPaperType,
   getSchool,getCampus
} from '$model/master-model';
import {uploadFile} from '$middleware/fileupload.middleware'
import { string } from 'zod';


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
}: paginationDefaultType) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT RESEARCH SERVICES ');

   const data = await journalPaginateModal({
      page,
      limit,
      sort,
      order,
      search,
      ...filters,
   });

   return data;
};

export const insertJournalArticleService = async (journalDetails: journalArticleDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');

    const documents = journalDetails.supporting_documents;
    console.log('journal details ',documents)
    await uploadFile(documents);

   //  const data = await insertJournalArticleModel(journalDetails);
 
    return {data : 'Insert' };
 }; 


 export const updateJournalArticleService = async (updateJournalDetails: journalArticleDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');
 
    const data = await updateJournalArticleModel(updateJournalDetails);
 
    return data;
 };


 export const deleteJournalArticleService = async(journalPaperId : number) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');

    console.log('journalPaperId in service ===>>>', journalPaperId);
 
    const data = await deleteJournalArticleModel(journalPaperId);

    console.log('data ===>>>>>', data);
    return data

 }

 export const journalRenderService = async () => {
   const logger = getLogger();
   
   const foreignAuthors =  await renderModal('fa');
   const StudentAuthors =  await renderModal('sa');
   const otherAuthors = await renderModal('oa');
   const policyCadre = await getPolicyCadre();
   const nmimsAuthors = await getNmimsAuthors();
   const allAuthors = await getAllAuthors();
   const abdcIndexed = await getAbdcIndexed();
   const paperType = await getPaperType();
   const school = await getSchool();
   const campus = await getCampus();
   return {
      foreignAuthors,StudentAuthors,otherAuthors,policyCadre,nmimsAuthors,allAuthors,abdcIndexed,paperType,school,campus
   };
 }