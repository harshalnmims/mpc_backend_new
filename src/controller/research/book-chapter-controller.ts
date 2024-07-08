import { getLogger } from '$config/logger-context';
import {
    getBookChapterService, insertBookChapterService, updateBookChapterService,
    deleteBookChapterService, renderBookChapterLists, bookChapterPublicationEditViewService,
    bookChapterViewService
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
 
    const data = await getBookChapterService({
       page,
       limit,
       search,
       sort,
       order,
       filters,
    });

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

    console.log('documents in controller ====>>>', documents);
    let result = validateWithZod(bookChapterPublication,bookChapterData);
    console.log('result ===>>>>>>', result)
    let fileResult = validateWithZod(filesArraySchema, documents);

    if(fileResult.success && result.success){
        data = await insertBookChapterService(bookChapterData, documents);
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
    console.log('documents ===>>>>>', documents);

    let result = validateWithZod(bookChapterPublication,bookChapterData);
    console.log('result ===>>>>>>', result)
    let fileResult = documents ?  validateWithZod(filesArraySchema, documents) : [];
    console.log('fileResult ===>>>>>',fileResult);

    const data = await updateBookChapterService(bookChapterData,documents,Number(booChapterId));
       
    console.log('data responce in controller ',data);
    return res.status(200).json(data);

 

}

export const deleteBookChapterForm = async (req: Request, res: Response , next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE deleteBookChapterForm CONTROLLER ');

    const bookChapterData = { ...req.body};
    console.log('data comming from frontend ===>', bookChapterData);

    const bookChapterId = bookChapterData.book_chapter_id;

    const data = await deleteBookChapterService(bookChapterId);

    console.log('data responce in controller ===>>>>', data);
    return res.status(200).json(data);

}


export const viewBookChapterformView = async(req: Request, res: Response , next: NextFunction) => {
    const logger = getLogger();
    const booChapterId =  req.query.id;
    const id = Number(booChapterId);
 
    console.log('id in controoler comming from frontend ====>>>>>', id);
    const data = await bookChapterViewService(id);
    console.log('data data responce in controller ===>>>>', data)
    return res.status(200).json(data);
}