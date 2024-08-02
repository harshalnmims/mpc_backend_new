import { getLogger } from '$config/logger-context';
import {
    getBookChapterService, insertBookChapterService, updateBookChapterService,
    deleteBookChapterService, renderBookChapterLists, bookChapterPublicationEditViewService,
    bookChapterViewService,bookChapterPublicationDownloadFileService
   } from '$service/research/book-chapter-service';
import { Request, Response, NextFunction } from 'express';
import { validateWithZod } from '$middleware/validation.middleware';
import { filesArraySchema } from '$validations/research.valid';
import { bookChapterPublication } from '$validations/research.valid';
import { number } from 'zod';

export const getBookChapter = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
 
    const {
       page = 1,
       limit = 10,
       sort = '',
       order = 'desc',
       search = '',
       ...filters
    } = { ...req.body, ...req.params, ...req.query };

    let username = res.locals.username;

 
    const data = await getBookChapterService({
       page,
       limit,
       search,
       sort,
       order,
       filters,
    },username);

    console.log('data responce in controller ===>>>>>>', data)
 
    return res.status(200).json(data);
}

export const renderBookChapterList = async(req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    const data = await renderBookChapterLists();
    return res.status(200).json(data);

}

export const insertBookChapterForm = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    // logger.info('INSIDE insertBookChapterForm CONTROLLER');
    let bookChapterData = JSON.parse(req.body.book_publication);
    console.log('bookChapterData ankit ===>>>>>', bookChapterData)
    let data;
    let documents = req.files;
    let username = res.locals.username;

    console.log('documents in controller ====>>>', documents);
    let result = validateWithZod(bookChapterPublication,bookChapterData);
    console.log('result ===>>>>>>', result)
    let fileResult = validateWithZod(filesArraySchema, documents);

    if(fileResult.success && result.success){
        data = await insertBookChapterService(bookChapterData, documents,username);
       }
       
    console.log('data response in controller ===>>>>>>', data)
    return res.status(200).json(data);

}

export const bookChapterPublicationEditviewForm = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    const booChapterId =  req.query.id;
    const id = Number(booChapterId);
 
    console.log('id in controoler comming from frontend ====>>>>>', id);
    const data = await bookChapterPublicationEditViewService(id);
    console.log('data data responce in controller ===>>>>', data)
    return res.status(200).json(data);
 
 }

export const updateBookChapterForm = async (req: Request, res: Response , next: NextFunction) => {
    const logger = getLogger();

    let bookChapterData = JSON.parse(req.body.update_book_chapter);
    console.log('bookChapterData ankit ===>>>>>', bookChapterData);
    let booChapterId = JSON.parse(req.body.book_chapter_id);
    console.log('booChapterId in controller update ===>>>>>', booChapterId);
    let documents = req.files;
    let data;
    let username = res.locals.username;
    console.log('documents ===>>>>>', documents);

    let result = validateWithZod(bookChapterPublication,bookChapterData);
    console.log('result ===>>>>>>', result)
    let fileResult = validateWithZod(filesArraySchema, documents);
    
    console.log('fileResult ===>>>>>',fileResult);
    if(result.success && fileResult.success){
        data = await updateBookChapterService(bookChapterData,documents,Number(booChapterId),username);

    }
       
    console.log('data responce in controller ',data);
    return res.status(200).json(data);

 

}

export const deleteBookChapterForm = async (req: Request, res: Response , next: NextFunction) => {
    const logger = getLogger();


    const id =  req.query.id;
    let username = res.locals.username;
    const booChapterId = Number(id);  
    console.log('booChapterId ==>>>>', booChapterId)


    const data = await deleteBookChapterService(booChapterId,username);

    console.log('data responce in controller ===>>>>', data);
    return res.status(200).json(data);

}


export const viewBookChapterformView = async(req: Request, res: Response , next: NextFunction) => {
    const logger = getLogger();
    const booChapterId =  req.query.id;
    const id = Number(booChapterId);
 
 
    console.log('id in controoler comming from frontend ====>>>>>', id);
    const data = await bookChapterViewService(Number(id));
    console.log('bookChapterPublicationFormviewModel Controller ===>>>>', JSON.stringify(data))
    return res.status(200).json(data);
}


export const downloadPublicationFiles = async (req : Request , res : Response , next  : NextFunction) => {

    const id = req.query.id;
    console.log('id ',id)
 
     await bookChapterPublicationDownloadFileService(Number(id), req, res);
 
  }