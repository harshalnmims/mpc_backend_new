import {
   getBookChapter,
   insertBookChapterForm,
   updateBookChapterForm,
   deleteBookChapterForm,
   renderBookChapterList,
   bookChapterPublicationEditviewForm,
   viewBookChapterformView,
   downloadPublicationFiles,
} from '$controller/research/book-chapter-controller';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

import multer from 'multer';
const upload = multer();

const bookChapterRoutes = Router();

bookChapterRoutes.get('/book-chapter-publication-paginate', asyncErrorHandler(getBookChapter));
bookChapterRoutes.get('/book-chapter-publication-render', asyncErrorHandler(renderBookChapterList));
bookChapterRoutes.get('/book-chapter-publication-edit-view', asyncErrorHandler(bookChapterPublicationEditviewForm));
bookChapterRoutes.post(
   '/book-chapter-publication-insert',
   upload.array('supporting_documents'),
   asyncErrorHandler(insertBookChapterForm),
);
bookChapterRoutes.post(
   '/book-chapter-publication-update',
   upload.array('supporting_documents'),
   asyncErrorHandler(updateBookChapterForm),
);
bookChapterRoutes.get('/book-chapter-publication-view-form', asyncErrorHandler(viewBookChapterformView));
bookChapterRoutes.post('/book-chapter-publication-delete', asyncErrorHandler(deleteBookChapterForm));
bookChapterRoutes.get('/book-chapter-publication-download-file', asyncErrorHandler(downloadPublicationFiles));

export default bookChapterRoutes;
