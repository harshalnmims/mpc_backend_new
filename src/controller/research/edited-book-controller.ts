import { getLogger } from '$config/logger-context';
import {getEditedBookPublicationService, insertEditedBookPublicationService, 
    updateEditedBookService, deleteEditedBookService
}  from '$service/research/edited-book-service';
import { Console } from 'console';

import { Request, Response, NextFunction } from 'express';

export const getEditedBookPublication = async (req: Request, res: Response, next: NextFunction) => {
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
 
    const data = await getEditedBookPublicationService({
       page,
       limit,
       search,
       sort,
       order,
       filters,
    });
 
    return res.status(200).json(data);
 };

 export const insertEditedBookForm = async(req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT FACULTY CONTROLLER');
    const editedBookPublicationData = { ...req.body};
    const data = await insertEditedBookPublicationService(editedBookPublicationData);

    console.log('data responce in controller ===>>>>', data)
 
    return res.status(200).json(data);
 }

 export const updateEditedBookForm = async(req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT FACULTY CONTROLLER');
    const updateEditedBookPublicationData = { ...req.body};
    const data = await updateEditedBookService(updateEditedBookPublicationData);

    console.log('data responce in controller ===>>>>', data)
 
    return res.status(200).json(data)
 }

 
 export const deleteEditedBookForm = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE deleteEditedBookForm CONTROLLER');
    const editedbook = { ...req.body};
    const editedbookId = editedbook.edited_publication_id;

    const data = await deleteEditedBookService(editedbookId);

    return res.status(200).json(data) 

 }


