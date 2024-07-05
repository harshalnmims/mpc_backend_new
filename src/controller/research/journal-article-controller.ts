import { getLogger } from '$config/logger-context';
import {
    getJournalArticleService, insertJournalArticleService, updateJournalArticleService, 
    deleteJournalArticleService,journalPaginateService,journalRenderService,journalViewService,journalUpdateViewService,
    journalDownloadFileService} from '$service/research/journal-article-service';
import { journalFiles } from '$model/journal-article-model';
import { Request, Response, NextFunction } from 'express';
import { validateWithZod } from '$middleware/validation.middleware';
import { filesArraySchema } from '$validations/research.valid';
import { journalPaper } from '$validations/research.valid';
import AWS from 'aws-sdk';
import { AwsData } from 'types/base.types';



export const getJournalArticle = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT RESEARCH CONTROLLER');
 
   //  const {
   //     page = 1,
   //     limit = 10,
   //     sort = '',
   //     order = 'desc',
   //     search = '',
   //     ...filters
   //  } = { ...req.body, ...req.params, ...req.query };

   // const data = { ...req.body, ...req.params, ...req.query };
   // console.log('data ',JSON.stringify(data))
 
   //  const data = await getJournalArticleService({
   //     page,
   //     limit,
   //     search,
   //     sort,
   //     order,
   //     filters,
   //  });
 
   //  return res.status(200).json(data);
 };


 export const insertJournalArticleForm = async (req: Request, res: Response, next: NextFunction) => {
   //  const logger = getLogger();
    
     let journalDetails = JSON.parse(req.body.journal_paper);
     let data;
     let documents = req.files;

     let result = validateWithZod(journalPaper,journalDetails);
     let fileResult = validateWithZod(filesArraySchema, documents);

     if(fileResult.success && result.success){
      data = await insertJournalArticleService(journalDetails,documents);
     }
     return res.status(200).json(data);
 };

 export const updateJournalArticleForm = async (req: Request, res: Response, next: NextFunction)  => {
    const logger = getLogger();
 
    let journalDetails = JSON.parse(req.body.journal_paper);
    let journalId = JSON.parse(req.body.journal_id);

    let data;
    let documents = req.files;

    console.log('json for update ',JSON.stringify(journalDetails),documents)
    let result = validateWithZod(journalPaper,journalDetails);
    let fileResult = validateWithZod(filesArraySchema, documents);

    if(fileResult.success && result.success){
      data = await updateJournalArticleService(journalDetails,documents,Number(journalId));
     }
     console.log('final json ',JSON.stringify(data))
     return res.status(200).json(data);
    

 } 


export const deleteJournalArticleForm = async (req: Request, res: Response, next: NextFunction)  => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT Journal article CONTROLLER');
 
    const journalPaper = { ...req.body};
    const journalPaperId  = journalPaper.journal_paper_id

    const data = await deleteJournalArticleService(journalPaperId);

    return  res.status(200).json(data)

 }

export const journalPaginate =  async (req : Request,res : Response , next : NextFunction) => {
   // const data = { ...req.body, ...req.params, ...req.query };
   // console.log('data ',JSON.stringify(data)) 
   
   const {
          page = 1,
          limit = 10,
          sort = '',
          order = 'desc',
          search = '',
          ...filters
       } = { ...req.body, ...req.params, ...req.query };

   const data = await journalPaginateService({
       page ,
       limit,
       search,  
       sort,
       order,
       filters,
    });

    console.log('data in controller comming from backend ===>>>>', data)
 
    return res.status(200).json(data); 
   // {
   //    baseQuery: `select distinct concat(pu.first_name,' ',pu.last_name) AS full_name, pu.id as user_lid, pu.username 
   //                    from mpc_user_role mur 
   //                   INNER JOIN user_session_info usi on usi.user_lid = mur.user_lid 
   //                   INNER JOIN mpc_role mr ON mr.id = mur.mpc_role_lid
   //                   INNER JOIN public.user pu on pu.id = usi.user_lid
   //                   WHERE mr.abbr = 'ca' `,

   //    filters: {
   //       'usi.program_lid': filters.programLid,
   //       'usi.session_lid': filters.sessionLid,
   //       'usi.subject_lid': filters.subjectLid,
   //    },
   //    cursor: {
   //       column: 'pu.id',
   //       value: Number(filters.cursor)
   //    },
   //    limit: limit.toString(),
   //    search: search || '',
   //    searchColumns: ['pu.username', 'pu.first_name', 'pu.last_name'],
   //    sort: {
   //       column: sort || 'pu.id',
   //       order: order || 'desc',
   //    },
   //}
 }

 export const journalRenderData = async (req : Request , res : Response , next  : NextFunction) => {

   const data = await journalRenderService();
   console.log('journal data ',JSON.stringify(data));
   return res.status(200).json(data);
 }

 export const journalViewController = async (req : Request , res : Response , next  : NextFunction) => {
    const id  = req.query.id ;
    const data = await journalViewService(Number(id));
    return res.status(200).json(data);
 }

 export const journalDownloadFile = async (req : Request , res : Response , next  : NextFunction) => {
   const id = req.query.id;
   console.log('id ',id)

    await journalDownloadFileService(Number(id),req,res);
 
 }

 export const journalUpdateViewController = async (req : Request , res : Response , next  : NextFunction) => {
    const id  = req.query.id ;
    const data = await journalUpdateViewService(Number(id));
    return res.status(200).json(data);
 
 }

