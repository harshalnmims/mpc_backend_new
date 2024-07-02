import { getLogger } from '$config/logger-context';
import {
   getBookPublicationService, insertBookPublicationService, updateBookPublicationService, 
    deleteBookPublicationService} from '$service/research/book-publication-service';
import { Request, Response, NextFunction } from 'express';


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
 
    return res.status(200).json(data);
 };


 export const insertBookPublicationForm = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT FACULTY CONTROLLER');
 
    const bookPublicationData = { ...req.body};
    const data = await insertBookPublicationService(bookPublicationData);
 
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