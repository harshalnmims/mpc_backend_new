import { getLogger } from '$config/logger-context';
import {
    getJournalArticleService, insertJournalArticleService, updateJournalArticleService, 
    deleteJournalArticleService,journalPaginateService} from '$service/research/journal-article-service';
import { Request, Response, NextFunction } from 'express';


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
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT FACULTY CONTROLLER');
 
    const journalDetails = { ...req.body};
    const data = await insertJournalArticleService(journalDetails);
 
    return res.status(200).json(data);
 };

 export const updateJournalArticleForm = async (req: Request, res: Response, next: NextFunction)  => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT FACULTY CONTROLLER');
 
    const journalDetails = { ...req.body};
    const data = await updateJournalArticleService(journalDetails);
 
    return res.status(200).json(data);

 } 


 export const deleteJournalArticleForm = async (req: Request, res: Response, next: NextFunction)  => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT Journal article CONTROLLER');
 
    const journalPaper = { ...req.body};
    const journalPaperId  = journalPaper.journal_paper_id

    const data = await deleteJournalArticleService(journalPaperId);

    return data.status === 200 ? res.status(200).json(data) : res.status(500).json(data);

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
