import { getLogger } from '$config/logger-context';
import {
   getBookPublicationService, insertBookPublicationService, updateBookPublicationService, 
    deleteBookPublicationService} from '$service/research/book-publication-service';
import { Request, Response, NextFunction } from 'express';

import { validateWithZod } from '$middleware/validation.middleware';
import { filesArraySchema } from '$validations/research.valid';
import { bookPublication } from '$validations/research.valid';



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
 
    const data = await getBookPublicationService({
       page,
       limit,
       search,
       sort,
       order,
       filters,
    });

    console.log('data in controller after render ===>>>>>>', data);
 
    return res.status(200).json(data);
 };


 export const insertBookPublicationForm = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
   //  logger.info('INSIDE GET BOOK PUBLICATION CONTROLLER');

    let bookPublicationData = JSON.parse(req.body.book_publication);
    console.log('bookPublicationData ankit ===>>>>>', bookPublicationData)
    let data;
     let documents = req.files;

    console.log('documents in controller ====>>>', documents);

    let result = validateWithZod(bookPublication,bookPublicationData);
    console.log('result ===>>>>>>', result)
    let fileResult = validateWithZod(filesArraySchema, documents);
    console.log('zod result ',JSON.stringify(fileResult))
 

    data = await insertBookPublicationService(bookPublicationData, documents);

    return res.status(200).json(data);
 };

 export const updateBookPublicationForm = async (req: Request, res: Response, next: NextFunction)  => {
    const logger = getLogger();
    logger.info('INSIDE GET updateBookPublicationFormCONTROLLER');
 
    const updateBookDetails = { ...req.body};
    const data = await updateBookPublicationService(updateBookDetails);
 
    return res.status(200).json(data);

 } 


 export const deleteBookPublicationForm = async (req: Request, res: Response, next: NextFunction)  => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT Journal article CONTROLLER');
 
    const bookPublication = { ...req.body};
    const bookPublicationId  = bookPublication.book_publication_id

    const data = await deleteBookPublicationService(bookPublicationId);

    return res.status(200).json(data);

 }