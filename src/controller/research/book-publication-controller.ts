import { getLogger } from '$config/logger-context';
import {
   getBookPublicationService, insertBookPublicationService, updateBookPublicationService, 
    deleteBookPublicationService, bookPublicationEditViewService, renderBookPublicationService,
    bookPublicationFormViewService, bookPublicationDownloadFileService} from '$service/research/book-publication-service';
import { Request, Response, NextFunction } from 'express';

import { validateWithZod } from '$middleware/validation.middleware';
import { filesArraySchema } from '$validations/research.valid';
import { bookPublication } from '$validations/research.valid';
import { number } from 'zod';



// export const getBookDetailsPaginate =  async (req : Request,res : Response , next : NextFunction) => {
  
//    const {
//           page = 1,
//           limit = 10,
//           sort = '',
//           order = 'desc',
//           search = '',
//           ...filters
//        } = { ...req.body, ...req.params, ...req.query };

//    const data = await getBookPublicationService({
//        page ,
//        limit,
//        search,  
//        sort,
//        order,
//        filters,
//     });

//     console.log('data in controller comming from backend ===>>>>', data)
 
//     return res.status(200).json(data); 
  
//  };


export const getBookPublication = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT RESEARCH CONTROLLER');
 
    const {
       page = 1,
       limit = 10,
       sort = '',
       order = 'desc',
       search = '',
       ...filters
    } = { ...req.body, ...req.params, ...req.query };

    let username = res.locals.username;
 
    const data = await getBookPublicationService({
       page,
       limit,
       search,
       sort,
       order,
       filters,
    },username);

    console.log('data in controller after render ===>>>>>>', data);
 
    return res.status(200).json(data);
 };


 export const renderBookPublicationList = async(req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   let username=res.locals.username;

   const data = await renderBookPublicationService(username);
   return res.status(200).json(data);
 }

export const insertBookPublicationForm = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
   //  logger.info('INSIDE GET BOOK PUBLICATION CONTROLLER');

    let bookPublicationData = JSON.parse(req.body.book_publication);
    console.log('bookPublicationData ankit ===>>>>>', bookPublicationData)
    let data;
    let documents = req.files;
    let username = res.locals.username;

    console.log('documents in controller ====>>>', documents);

    let result = validateWithZod(bookPublication,bookPublicationData);
    console.log('result ===>>>>>>', result)
    let fileResult = validateWithZod(filesArraySchema, documents);
    console.log('zod result ',JSON.stringify(fileResult))
 
    if(fileResult.success && result.success){
      data = await insertBookPublicationService(bookPublicationData, documents,username);
     }

    return res.status(200).json(data);
 };

export const bookPublicationEditviewForm = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   const bookPublicationId =  req.query.id;
   const id = Number(bookPublicationId);
   let username=res.locals.username;

   console.log('id in controoler comming from frontend ====>>>>>', id);
   const data = await bookPublicationEditViewService(id, username);
   console.log('data data responce in controller ===>>>>', data)
   return res.status(200).json(data);

}

 export const updateBookPublicationForm = async (req: Request, res: Response, next: NextFunction)  => {
    const logger = getLogger();
 
    let bookPublicationData = JSON.parse(req.body.update_book_publication);
    console.log('bookPublicationData ankit ===>>>>>', bookPublicationData);
    let bookPublicationId = JSON.parse(req.body.book_publication_id);
    console.log('bookPublicationId in controller update ===>>>>>', bookPublicationId);
    let documents = req.files;
    let username= res.locals.username;
    let data
    console.log('documents ===>>>>>', documents);
    console.log('documents in controller ====>>>', documents);

    let result = validateWithZod(bookPublication,bookPublicationData);
    console.log('result ===>>>>>>', result)
    let fileResult = validateWithZod(filesArraySchema, documents);
    console.log('zod result ',JSON.stringify(fileResult));


    if(result.success && fileResult.success){   
    data = await updateBookPublicationService(bookPublicationId, bookPublicationData, documents,username);
    }
    return res.status(200).json(data);

 } 


 export const deleteBookPublicationForm = async (req: Request, res: Response, next: NextFunction)  => {
    const logger = getLogger();
   //  logger.info('INSIDE GET SUBJECT Journal article CONTROLLER');
 
   const bookPublicationId =  req.query.id;
   console.log('bookPublicationId Ankit Mishra====>>>>>>>', bookPublicationId);
   const id = Number(bookPublicationId);
   let username=res.locals.username;

    const data = await deleteBookPublicationService(id,username);
    console.log('data  responce in controller===>>>>>', data);

    return res.status(200).json(data);

 }


 export const bookPublicationViewForm = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   const bookPublicationId =  req.query.id;
   const id = Number(bookPublicationId);

   console.log('id in controoler  book publicationcomming from frontend ====>>>>>', id);
   const data = await bookPublicationFormViewService(id);
   console.log('data data responce in controller ===>>>>', data)
   return res.status(200).json(data);

}


export const downloadPublicationFiles = async (req : Request , res : Response , next  : NextFunction) => {

   const id = req.query.id;
   console.log('id ',id)

    await bookPublicationDownloadFileService(Number(id), req, res);

 }

 export const bookPublicationInfinite = async (req : Request , res : Response , next  : NextFunction) => {

    console.log('inifinite hitted');
    return res.status(200).json({data:''});
 }