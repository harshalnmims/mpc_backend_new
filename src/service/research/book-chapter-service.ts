import { getLogger } from '$config/logger-context';
import { getBookChapterPublication, insertBookChapterModel, updateBookChapterModel, 
    deleteBookChapterModel
 } from '$model/book-chapter-model';
import exp from 'constants';
import { paginationDefaultType } from 'types/db.default';

import { bookChapterDetails} from 'types/research.types';

export const getBookChapterService = async ({
    page,
    limit,
    sort,
    order,
    search,
    ...filters
 }: paginationDefaultType) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT RESEARCH SERVICES');
 
    const data = await getBookChapterPublication({
       page,
       limit,
       sort,
       order,
       search,
       ...filters,
    });
 
    return data;
 };

 export const insertBookChapterService = async (bookChapterData : bookChapterDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');
    console.log('bookChapterData in service ====>>>>>', bookChapterData);
 
    const data = await insertBookChapterModel(bookChapterData);
 
    return data;
 }

export const updateBookChapterService = async(updateBookChapterData : bookChapterDetails) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');
    console.log('updateBookChapterData in service ====>>>>>', updateBookChapterData);
 
    const data = await updateBookChapterModel(updateBookChapterData);
 
    return data;

}

export const deleteBookChapterService = async(bookChapterId : number) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT JOURNAL ARTICLE  SERVICES');
    console.log('bookChapterId in service ====>>>>>', bookChapterId);
 
    const data = await deleteBookChapterModel(bookChapterId);
 
    return data;

}