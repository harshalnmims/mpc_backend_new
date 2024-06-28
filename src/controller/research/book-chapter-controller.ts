import { getLogger } from '$config/logger-context';
import {
    getBookChapterService, insertBookChapterService, updateBookChapterService,
    deleteBookChapterService
   } from '$service/research/book-chapter-service';
import { Request, Response, NextFunction } from 'express';

export const getBookChapter = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET getBookChapter CONTROLLER');
 
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
 
    return res.status(200).json(data);
}

export const insertBookChapterForm = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE insertBookChapterForm CONTROLLER');

    const bookChapterData = { ...req.body};

    const data = await insertBookChapterService(bookChapterData);

    console.log('data response in book chapter controller ====>>>>>>', data);
 
    return res.status(200).json(data);

}

export const updateBookChapterForm = async (req: Request, res: Response , next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE updateBookChapterForm CONTROLLER');

    const updateBookChapterData = { ...req.body};

    const data = await updateBookChapterService(updateBookChapterData);

    console.log('data response in book chapter controller ====>>>>>>', data);
 
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