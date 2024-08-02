import { getLogger } from '$config/logger-context';
import { validateWithZod } from '$middleware/validation.middleware';
import {getEditedBookPublicationService, insertEditedBookPublicationService, 
    updateEditedBookService, deleteEditedBookService, editedBookPaginateService, editedBookRenderService, editedBookPublicationEditViewService, editedBookPublicationDownloadFileService, editedBookViewService
}  from '$service/research/edited-book-service';
import { bookPublication, editedBookPublication, filesArraySchema } from '$validations/research.valid';

import { Request, Response, NextFunction } from 'express';
import { number } from 'zod';
import { file } from 'zod-form-data';

export const getEditedBookPublication = async (req: Request, res: Response, next: NextFunction) => {
 
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
   JSON.parse(req.body.edited_book_publication)
    const editedBookPublicationData = JSON.parse(req.body.edited_book_publication);
    let data;
    let documents = req.files;

    const username = res.locals.username;
    let result = validateWithZod(editedBookPublication,editedBookPublicationData);
    console.log('result ===>>>>>>', result)
    let fileResult = validateWithZod(filesArraySchema, documents);
    console.log('zod result ',JSON.stringify(fileResult))
 
    if(fileResult.success && result.success){
      data = await insertEditedBookPublicationService(editedBookPublicationData, documents,username);
     }

    console.log('data responce in controller ===>>>>', data)
 
    return res.status(200).json(data);
 }

 export const updateEditedBookForm = async(req: Request, res: Response, next: NextFunction) => {
    const updateEditedBookPublicationData = JSON.parse(req.body.update_edited_book);
    let editedBookId = JSON.parse(req.body.edited_publication_id);
    console.log('editedBookId in controller update ===>>>>>', editedBookId);
    console.log('updateEditedBookPublicationData in controller ====>>>>', updateEditedBookPublicationData)
    let username = res.locals.username;
    console.log('username ===>>>>>>>', username);
    let data
    let documents = req.files;
    let result = validateWithZod(editedBookPublication,updateEditedBookPublicationData);
    let fileResult = validateWithZod(filesArraySchema, documents); 
    if(result.success && fileResult.success){
      data = await updateEditedBookService(updateEditedBookPublicationData, documents,username, editedBookId);
    }

     

    console.log('data responce in controller ===>>>>', data)
 
    return res.status(200).json(data)
 }

 
 export const deleteEditedBookForm = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.query.id;
    const editedbookId = Number(id);
    console.log('editedbookId ====>>>>>>', editedbookId)
    let username=res.locals.username;
    console.log('username ====>>>>', username)

    const data = await deleteEditedBookService(editedbookId,username);

    return res.status(200).json(data) 

 }

 export const editedBookPaginate = async (req: Request, res: Response, next: NextFunction) => {

   const {
      page = 1,
      limit = 10,
      sort = '',
      order = 'desc',
      search = '',
      ...filters
   } = { ...req.body, ...req.params, ...req.query };

   let username = res.locals.username

   const data = await editedBookPaginateService({
      page ,
      limit,
      search,  
      sort,
      order,
      filters,
   },username);

   return res.status(200).json(data); 
 }

 export const editedBookRenderData = async (req: Request, res: Response, next: NextFunction) => {
   const data = await editedBookRenderService();
   console.log('edited book data ',JSON.stringify(data));
   return res.status(200).json(data);
 }

export const editedBookPublicationEditView = async (req: Request, res: Response, next: NextFunction) => {
   const id = req.query.id
   const editedBookId = Number(id)

   const data = await editedBookPublicationEditViewService(editedBookId);
   console.log('edited book data ', JSON.stringify(data));
   return res.status(200).json(data);
 
}

export const downloadPublicationFiles = async (req : Request , res : Response , next  : NextFunction) => {

   const id = req.query.id;
   console.log('edited book id controller ====>>>>>>',id)

    await editedBookPublicationDownloadFileService(Number(id), req, res);

 }

 export const editedBookPublicationViewForm = async (req: Request, res: Response, next: NextFunction) => {
   const id = req.query.id
   console.log('view id', id);

   const data = await editedBookViewService(Number(id));
   return res.status(200).json(data);
   
 }