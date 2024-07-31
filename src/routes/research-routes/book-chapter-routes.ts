import { getBookChapter, insertBookChapterForm, updateBookChapterForm,
    deleteBookChapterForm, renderBookChapterList,
    bookChapterPublicationEditviewForm, viewBookChapterformView, downloadPublicationFiles
} from '$controller/research/book-chapter-controller'
import { validateUserSession } from '$middleware/auth.middleware';
import { asyncErrorHandler } from '$middleware/error.middleware';
import { Router } from 'express';

import multer from 'multer';
const upload = multer();

const bookChapterRoutes = Router();

bookChapterRoutes.get('/book-chapter-publication-paginate',asyncErrorHandler(validateUserSession), asyncErrorHandler(getBookChapter));
bookChapterRoutes.get('/book-chapter-publication-render',asyncErrorHandler(validateUserSession), asyncErrorHandler(renderBookChapterList));
bookChapterRoutes.get('/book-chapter-publication-edit-view',asyncErrorHandler(validateUserSession), asyncErrorHandler(bookChapterPublicationEditviewForm));
bookChapterRoutes.post('/book-chapter-publication-insert',asyncErrorHandler(validateUserSession), upload.array("supporting_documents"), asyncErrorHandler(insertBookChapterForm));
bookChapterRoutes.post('/book-chapter-publication-update',asyncErrorHandler(validateUserSession), upload.array("supporting_documents"), asyncErrorHandler(updateBookChapterForm));
bookChapterRoutes.get('/book-chapter-publication-view-form',asyncErrorHandler(validateUserSession), asyncErrorHandler(viewBookChapterformView));
bookChapterRoutes.post('/book-chapter-publication-delete', asyncErrorHandler(validateUserSession),asyncErrorHandler(deleteBookChapterForm));
bookChapterRoutes.get('/book-chapter-publication-download-file',asyncErrorHandler(validateUserSession), asyncErrorHandler(downloadPublicationFiles));



export default bookChapterRoutes;
